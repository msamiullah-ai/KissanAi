import time
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime, timedelta
from typing import Any
from urllib.parse import urlencode

import requests
from requests.exceptions import RequestException

from app.core.logging import get_logger
from app.core.timing import record_metric
from app.config import AppConfig
from app.schemas.weather import WeatherForecast, WeatherHealthResponse, WeatherResponse
from app.constants import (
    DISTRICT_COORDINATES,
    HEAT_STRESS_THRESHOLD,
    RAIN_ALERT_THRESHOLD,
    DROUGHT_RAINFALL_THRESHOLD,
    PESTICIDE_WIND_THRESHOLD,
    SAFE_CONDITIONS_THRESHOLD,
    IRRIGATION_OPTIMIZATION_THRESHOLD,
)

config = AppConfig()
logger = get_logger("kissanai.weather")


class WeatherServiceError(Exception):
    pass


@dataclass
class CachedWeather:
    response: WeatherResponse
    inserted_at: datetime
    last_access: datetime


class WeatherClient:
    BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
    TIMEOUT_SECONDS = 8
    RETRIES = 3
    BACKOFF_FACTOR = 1.25
    CACHE_TTL_SECONDS = config.weather_cache_ttl
    RATE_LIMIT_WINDOW_SECONDS = config.weather_rate_limit_window_seconds
    RATE_LIMIT_MAX_REQUESTS = config.weather_rate_limit_request_count

    _cache: dict[str, CachedWeather] = {}
    _request_counts: dict[str, list[datetime]] = defaultdict(list)
    _last_successful_sync: dict[str, datetime] = {}
    _total_response_time_ms: float = 0.0
    _response_count: int = 0

    @classmethod
    def _cleanup_cache(cls) -> None:
        now = datetime.utcnow()
        stale_keys = [key for key, entry in cls._cache.items() if now - entry.inserted_at > timedelta(seconds=cls.CACHE_TTL_SECONDS * 2)]
        for key in stale_keys:
            logger.info("weather.cache_cleanup", extra={"district": key, "stale_age": (now - cls._cache[key].inserted_at).total_seconds()})
            cls._cache.pop(key, None)

    @classmethod
    def _get_coords(cls, district: str) -> tuple[float, float] | None:
        return DISTRICT_COORDINATES.get(district.strip().lower())

    @classmethod
    def _build_url(cls, lat: float, lon: float) -> str:
        params = {
            "lat": lat,
            "lon": lon,
            "appid": config.openweather_api_key,
            "units": "metric",
        }
        return f"{cls.BASE_URL}?{urlencode(params)}"

    @classmethod
    def _record_response_time(cls, duration_ms: float, district: str) -> None:
        cls._total_response_time_ms += duration_ms
        cls._response_count += 1
        cls._last_successful_sync[district.strip().lower()] = datetime.utcnow()

    @classmethod
    def _record_rate_limit(cls, district: str) -> bool:
        now = datetime.utcnow()
        key = district.strip().lower()
        window_start = now - timedelta(seconds=cls.RATE_LIMIT_WINDOW_SECONDS)
        cls._request_counts[key] = [timestamp for timestamp in cls._request_counts[key] if timestamp >= window_start]
        if len(cls._request_counts[key]) >= cls.RATE_LIMIT_MAX_REQUESTS:
            logger.warning("weather.rate_limit_exceeded", extra={"district": key, "request_count": len(cls._request_counts[key])})
            return False
        cls._request_counts[key].append(now)
        return True

    @classmethod
    def _build_cache_key(cls, district: str) -> str:
        return district.strip().lower()

    @classmethod
    def _get_cached(cls, cache_key: str) -> WeatherResponse | None:
        cached = cls._cache.get(cache_key)
        if not cached:
            logger.info("weather.cache_miss", extra={"cache_key": cache_key})
            return None
        cached.last_access = datetime.utcnow()
        age = (datetime.utcnow() - cached.inserted_at).total_seconds()
        if age < cls.CACHE_TTL_SECONDS:
            logger.info("weather.cache_hit", extra={"cache_key": cache_key, "age_seconds": age})
            return cached.response
        logger.warning("weather.cache_stale", extra={"cache_key": cache_key, "age_seconds": age})
        return cached.response

    @classmethod
    def _store_cache(cls, cache_key: str, response: WeatherResponse) -> None:
        cls._cache[cache_key] = CachedWeather(response=response, inserted_at=datetime.utcnow(), last_access=datetime.utcnow())
        logger.info("weather.cache_store", extra={"cache_key": cache_key})

    @classmethod
    def _request(cls, url: str) -> dict[str, Any]:
        last_error: RequestException | None = None
        for attempt in range(1, cls.RETRIES + 1):
            start = time.perf_counter()
            try:
                response = requests.get(url, timeout=cls.TIMEOUT_SECONDS)
                response.raise_for_status()
                elapsed_ms = round((time.perf_counter() - start) * 1000, 2)
                record_metric("weather_fetch_duration_ms", elapsed_ms)
                logger.info("weather.api_request", extra={"url": url, "attempt": attempt, "duration_ms": elapsed_ms})
                return response.json()
            except RequestException as exc:
                elapsed_ms = round((time.perf_counter() - start) * 1000, 2)
                logger.warning("weather.api_request_failed", extra={"url": url, "attempt": attempt, "duration_ms": elapsed_ms, "error": str(exc)})
                last_error = exc
                if attempt == cls.RETRIES:
                    raise WeatherServiceError("Live weather service unavailable") from exc
                time.sleep(cls.BACKOFF_FACTOR * attempt)
        raise WeatherServiceError("Live weather request failed") from last_error

    @classmethod
    def _map_condition_to_badges(
        cls,
        temperature: float,
        humidity: int,
        rainfall_chance: float,
        wind_speed: float,
    ) -> list[str]:
        badges: list[str] = []
        if temperature >= HEAT_STRESS_THRESHOLD or (temperature >= HEAT_STRESS_THRESHOLD - 4 and humidity >= 70):
            badges.append("Heat Stress Risk")
        if rainfall_chance >= RAIN_ALERT_THRESHOLD:
            badges.append("Rain Alert")
        if rainfall_chance <= DROUGHT_RAINFALL_THRESHOLD and humidity <= 35:
            badges.append("Drought Warning")
        if wind_speed >= PESTICIDE_WIND_THRESHOLD or rainfall_chance >= 30.0:
            badges.append("Pesticide Spray Warning")
        if rainfall_chance < 30.0 and temperature <= 30.0 and humidity <= 75:
            badges.append("Safe Farming Conditions")
        if rainfall_chance <= IRRIGATION_OPTIMIZATION_THRESHOLD:
            badges.append("Irrigation Optimization Warning")
        if not badges:
            badges.append("Safe Farming Conditions")
        return badges

    @classmethod
    def _build_forecast(cls, current: dict[str, Any], temperature: float, humidity: int, rainfall_chance: float, wind_speed: float) -> list[WeatherForecast]:
        weather_data = current.get("weather", [{}])[0]
        return [
            WeatherForecast(
                date=datetime.utcnow(),
                condition=weather_data.get("main", "Unknown"),
                temperature=temperature,
                humidity=humidity,
                rainfall_chance=rainfall_chance,
                wind_speed=wind_speed,
            )
        ]

    @classmethod
    def get_weather_for_district(cls, district: str) -> WeatherResponse:
        cls._cleanup_cache()
        cache_key = cls._build_cache_key(district)
        cached_response = cls._get_cached(cache_key)
        coords = cls._get_coords(district)
        if coords is None:
            raise WeatherServiceError(f"Unsupported district: {district}")

        if not cls._record_rate_limit(district):
            if cached_response is not None:
                logger.warning("weather.rate_limit_fallback", extra={"district": district})
                return cached_response
            raise WeatherServiceError("Weather request rate limit exceeded")

        url = cls._build_url(*coords)
        try:
            start = time.perf_counter()
            payload = cls._request(url)
            elapsed_ms = round((time.perf_counter() - start) * 1000, 2)

            weather_data = payload.get("weather", [{}])[0]
            main_data = payload.get("main", {})
            wind_data = payload.get("wind", {})
            clouds_data = payload.get("clouds", {})
            rainfall_mm = float(payload.get("rain", {}).get("1h", 0.0) if isinstance(payload.get("rain", {}), dict) else payload.get("rain", 0.0) or 0.0)
            temperature = round(main_data.get("temp", 0.0), 1)
            feels_like = round(main_data.get("feels_like", 0.0), 1)
            humidity = int(main_data.get("humidity", 0))
            pressure = int(main_data.get("pressure", 0))
            wind_speed = round(wind_data.get("speed", 0.0), 1)
            cloud_coverage = int(clouds_data.get("all", 0))
            condition = weather_data.get("main", "Unknown")
            condition_description = weather_data.get("description", "")
            weather_icon = weather_data.get("icon", "")
            rainfall_chance = (
                100.0 if rainfall_mm > 0
                else round(min(max(cloud_coverage * 0.45 + humidity * 0.35, 0.0), 100.0), 1)
            )

            response = WeatherResponse(
                district=district,
                temperature=temperature,
                feels_like=feels_like,
                humidity=humidity,
                pressure=pressure,
                clouds=cloud_coverage,
                weather_icon=weather_icon,
                rainfall_chance=rainfall_chance,
                rainfall_mm=rainfall_mm,
                wind_speed=wind_speed,
                condition=condition,
                condition_description=condition_description,
                status_badges=cls._map_condition_to_badges(temperature, humidity, rainfall_chance, wind_speed),
                forecast=cls._build_forecast(payload, temperature, humidity, rainfall_chance, wind_speed),
                fetched_at=datetime.utcnow(),
            )
            cls._store_cache(cache_key, response)
            cls._record_response_time(elapsed_ms, district)
            record_metric("weather_fetch_duration_ms", elapsed_ms)
            logger.info("weather.fetch_success", extra={"district": district, "duration_ms": elapsed_ms})
            return response
        except WeatherServiceError as error:
            if cached_response is not None:
                logger.warning("weather.fallback_to_stale_cache", extra={"district": district, "error": str(error)})
                return cached_response
            logger.error("weather.fetch_failure", extra={"district": district, "error": str(error)})
            raise

    @classmethod
    def validate_service(cls) -> None:
        coords = cls._get_coords("lahore")
        if coords is None:
            raise WeatherServiceError("No default district coordinate mapping available")
        cls._build_url(*coords)

    @classmethod
    def get_health_status(cls) -> WeatherHealthResponse:
        total_cached = len(cls._cache)
        average_ms = round(cls._total_response_time_ms / cls._response_count, 2) if cls._response_count else 0.0
        last_sync = max(cls._last_successful_sync.values()).isoformat() + "Z" if cls._last_successful_sync else None
        cache_age = None
        if cls._cache:
            oldest = min(entry.inserted_at for entry in cls._cache.values())
            cache_age = round((datetime.utcnow() - oldest).total_seconds(), 2)
        return WeatherHealthResponse(
            api_reachable=bool(cls._response_count > 0),
            cache_status={"items": total_cached, "oldest_entry_age_seconds": cache_age},
            last_successful_sync=last_sync,
            average_response_time_ms=average_ms,
            health="ok" if cls._response_count > 0 else "degraded",
        )
