from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import AppConfig
from .core.logging import get_logger, setup_logging
from .core.timing import RequestTimingMiddleware
from .database.base import Base
from .database.session import engine
from .routes.crop import router as crop_router
from .routes.health import router as health_router
from .routes.recommendation import router as recommendation_router
from .routes.weather import router as weather_router
from .services.weather_service import WeatherClient

config = AppConfig()
setup_logging(config.log_level)
logger = get_logger("kissanai.startup")


def create_app() -> FastAPI:
    app = FastAPI(title="KissanAI Backend", version="0.1.0")
    app.add_middleware(
        RequestTimingMiddleware,
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[origin.strip() for origin in config.cors_origins.split(",") if origin.strip()],
        allow_credentials=True,
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
                connection.execute("SELECT 1")
            logger.info("startup.database.connected")
        except Exception as error:
            logger.error("startup.database.failed", extra={"error": str(error)})
            raise

        try:
            WeatherClient.validate_service()
            logger.info("startup.weather.validated")
        except Exception as error:
            logger.warning("startup.weather.validation_failed", extra={"error": str(error)})

    return app


app = create_app()
Base.metadata.create_all(bind=engine)
