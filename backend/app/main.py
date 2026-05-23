from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect, text

from .config import AppConfig
from .core.logging import get_logger, setup_logging
from .core.timing import RequestTimingMiddleware
from .database.session import engine
from .routes.crop import router as crop_router
from .routes.health import router as health_router
from .routes.recommendation import router as recommendation_router
from .routes.weather import router as weather_router
from .services.weather_service import WeatherClient

config = AppConfig()
setup_logging(config.log_level)
logger = get_logger("kissanai.startup")


OPENAPI_TAGS = [
    {
        "name": "Health",
        "description": "Operational health checks for the KissanAI backend.",
    },
    {
        "name": "Weather",
        "description": "OpenWeather-backed district weather intelligence.",
    },
    {
        "name": "Recommendations",
        "description": "Single crop recommendation engine and farm decision intelligence.",
    },
    {
        "name": "Deprecated",
        "description": "Retired compatibility endpoints with replacement guidance.",
    },
]


def create_app() -> FastAPI:
    app = FastAPI(
        title="KissanAI Backend",
        version="0.1.0",
        description="FastAPI service for weather-aware crop recommendation intelligence.",
        openapi_tags=OPENAPI_TAGS,
    )
    cors_origins = [origin.strip() for origin in config.cors_origins.split(",") if origin.strip()]
    allow_credentials = "*" not in cors_origins
    
    app.add_middleware(
        RequestTimingMiddleware,
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_origins,
        allow_credentials=allow_credentials,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    app.include_router(health_router, prefix="/api")
    app.include_router(crop_router, prefix="/api")
    app.include_router(recommendation_router, prefix="/api")
    app.include_router(weather_router, prefix="/api")

    @app.on_event("startup")
    async def startup_checks() -> None:
        logger.info("startup.begin")
        try:
            with engine.connect() as connection:
                connection.execute(text("SELECT 1"))
                existing_tables = set(inspect(connection).get_table_names())
            logger.info("startup.database.connected")
            required_tables = {"users", "farms", "crops", "recommendations"}
            missing_tables = sorted(required_tables - existing_tables)
            if missing_tables:
                logger.warning("startup.database.migrations_missing", extra={"missing_tables": missing_tables})
            else:
                logger.info("startup.database.migrations_verified")
        except Exception as error:
            import traceback
            traceback.print_exc()
            logger.warning("startup.database.unavailable", extra={"error": str(error)})

        try:
            WeatherClient.validate_service()
            logger.info("startup.weather.validated")
        except Exception as error:
            logger.warning("startup.weather.validation_failed", extra={"error": str(error)})

    return app


app = create_app()
