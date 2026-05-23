from pathlib import Path
from dotenv import load_dotenv
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Union

# Resolve the .env file path
ENV_PATH = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(dotenv_path=ENV_PATH)

class AppConfig(BaseSettings):
    app_name: str = "KissanAI"
    environment: str = "development"
    database_url: Union[str, None] = None
    openweather_api_key: str
    cors_origins: str = "*"
    log_level: str = "INFO"
    weather_cache_ttl: int = 600
    weather_rate_limit_request_count: int = 25
    weather_rate_limit_window_seconds: int = 60

    # Modern Pydantic V2 Config
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False)

    @field_validator("database_url", mode="before")
    @classmethod
    def setup_database_fallback(cls, value: Union[str, None]) -> str:
        """Require the PostgreSQL database used by the production-local stack."""
        if not value:
            raise ValueError("DATABASE_URL is required, for example postgresql+psycopg2://postgres:password@localhost:5432/kissanai")
        if not value.startswith("postgresql"):
            raise ValueError("DATABASE_URL must point to PostgreSQL for KissanAI models and migrations")
        return value

    @field_validator("log_level")
    @classmethod
    def validate_log_level(cls, value: str) -> str:
        levels = {"DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"}
        upper_val = value.upper()
        if upper_val not in levels:
            raise ValueError(f"Invalid log_level {value}. Must be one of {levels}")
        return upper_val
