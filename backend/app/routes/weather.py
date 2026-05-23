from fastapi import APIRouter, HTTPException, status

from ..schemas.weather import WeatherHealthResponse, WeatherResponse
from ..schemas.api import ErrorResponse
from ..services.weather_service import WeatherClient, WeatherServiceError

router = APIRouter()


@router.get(
    "/weather/health",
    response_model=WeatherHealthResponse,
    status_code=status.HTTP_200_OK,
    tags=["Weather"],
    summary="Weather service health",
    description="Returns cache and live OpenWeather integration status for the weather subsystem.",
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {
            "model": ErrorResponse,
            "description": "Weather health check failed",
        },
    },
)
def get_weather_health_route() -> WeatherHealthResponse:
    try:
        return WeatherClient.get_health_status()
    except Exception as error:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(error))


@router.get(
    "/weather/{district}",
    response_model=WeatherResponse,
    status_code=status.HTTP_200_OK,
    tags=["Weather"],
    summary="Get live weather by district",
    description="Fetches current weather intelligence for a supported district using OpenWeather /data/2.5/weather.",
    responses={
        status.HTTP_503_SERVICE_UNAVAILABLE: {
            "model": ErrorResponse,
            "description": "Live weather service unavailable or district unsupported",
        },
        status.HTTP_500_INTERNAL_SERVER_ERROR: {
            "model": ErrorResponse,
            "description": "Unexpected weather API failure",
        },
    },
)
def get_weather_route(district: str) -> WeatherResponse:
    try:
        return WeatherClient.get_weather_for_district(district)
    except WeatherServiceError as error:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(error))
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to fetch weather data")
