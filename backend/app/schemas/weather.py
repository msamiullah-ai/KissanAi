from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class WeatherForecast(BaseModel):
    date: datetime = Field(..., examples=["2026-05-22T05:20:57.964281"])
    condition: str = Field(..., examples=["Clouds"])
    temperature: float = Field(..., examples=[34.0])
    humidity: int = Field(..., ge=0, le=100, examples=[31])
    rainfall_chance: float = Field(..., ge=0, le=100, examples=[37.9])
    wind_speed: float = Field(..., ge=0, examples=[3.1])


class WeatherResponse(BaseModel):
    district: str = Field(..., examples=["Lahore"])
    temperature: float = Field(..., examples=[34.0])
    feels_like: float = Field(..., examples=[32.8])
    humidity: int = Field(..., ge=0, le=100, examples=[31])
    pressure: int = Field(..., examples=[1006])
    clouds: int = Field(..., ge=0, le=100, examples=[20])
    weather_icon: str = Field(..., examples=["04d"])
    rainfall_chance: float = Field(..., ge=0, le=100, examples=[37.9])
    rainfall_mm: float = Field(..., ge=0, examples=[0.0])
    wind_speed: float = Field(..., ge=0, examples=[3.1])
    condition: str = Field(..., examples=["Clouds"])
    condition_description: str = Field(..., examples=["broken clouds"])
    status_badges: list[str] = Field(..., examples=[["Safe Farming Conditions", "Irrigation Optimization Warning"]])
    forecast: list[WeatherForecast]
    fetched_at: datetime

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "district": "Lahore",
                "temperature": 34.0,
                "feels_like": 32.8,
                "humidity": 31,
                "pressure": 1006,
                "clouds": 20,
                "weather_icon": "04d",
                "rainfall_chance": 37.9,
                "rainfall_mm": 0.0,
                "wind_speed": 3.1,
                "condition": "Clouds",
                "condition_description": "broken clouds",
                "status_badges": ["Safe Farming Conditions", "Irrigation Optimization Warning"],
                "forecast": [
                    {
                        "date": "2026-05-22T05:20:57.964281",
                        "condition": "Clouds",
                        "temperature": 34.0,
                        "humidity": 31,
                        "rainfall_chance": 37.9,
                        "wind_speed": 3.1,
                    }
                ],
                "fetched_at": "2026-05-22T05:20:57.964281",
            }
        }
    )


class WeatherCacheStatus(BaseModel):
    items: int = Field(..., ge=0, examples=[1])
    oldest_entry_age_seconds: float | None = Field(None, ge=0, examples=[62.16])


class WeatherHealthResponse(BaseModel):
    api_reachable: bool = Field(..., examples=[True])
    cache_status: WeatherCacheStatus
    last_successful_sync: str | None = Field(None, examples=["2026-05-22T05:20:57.963733Z"])
    average_response_time_ms: float = Field(..., ge=0, examples=[871.84])
    health: str = Field(..., examples=["ok"])
