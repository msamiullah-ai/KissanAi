from datetime import datetime
from typing import Any

from pydantic import BaseModel


class WeatherForecast(BaseModel):
    date: datetime
    condition: str
    temperature: float
    humidity: int
    rainfall_chance: float
    wind_speed: float


class WeatherResponse(BaseModel):
    district: str
    temperature: float
    humidity: int
    rainfall_chance: float
    rainfall_mm: float
    wind_speed: float
    condition: str
    condition_description: str
    status_badges: list[str]
    forecast: list[WeatherForecast]
    fetched_at: datetime


class WeatherHealthResponse(BaseModel):
    api_reachable: bool
    cache_status: dict[str, Any]
    last_successful_sync: str | None
    average_response_time_ms: float
    health: str
