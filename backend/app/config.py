from pathlib import Path

from dotenv import load_dotenv
from pydantic import BaseSettings, PostgresDsn, validator

ENV_PATH = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(dotenv_path=ENV_PATH)


class AppConfig(BaseSettings):
    app_name: str = "KissanAI"
    environment: str = "development"
    database_url: PostgresDsn
    openweather_api_key: str
    cors_origins: str = "*"
    log_level: str = "INFO"
    weather_cache_ttl: int = 600
    weather_rate_limit_request_count: int = 25
    weather_rate_limit_window_seconds: int = 60

    class Config:
        env_file = ".env"
        case_sensitive = True

    @validator("log_level")
    def validate_log_level(cls, value: str) -> str:
        levels = {"DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"}
        if value.upper() not in levels:
            raise ValueError(f"Invalid log_level {value}. Must be one of {levels}")
        return value.upper()
