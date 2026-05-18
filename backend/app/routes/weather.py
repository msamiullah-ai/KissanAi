from fastapi import APIRouter, HTTPException, status

from ..schemas.weather import WeatherHealthResponse, WeatherResponse
from ..services.weather_service import WeatherClient, WeatherServiceError

router = APIRouter()


@router.get(
    "/weather/{district}",
    response_model=WeatherResponse,
    status_code=status.HTTP_200_OK,
    tags=["Weather"],
)
def get_weather_route(district: str) -> WeatherResponse:
    try:
        return WeatherClient.get_weather_for_district(district)
    except WeatherServiceError as error:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(error))
    except Exception as error:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to fetch weather data")


@router.get(
    "/weather/health",
    response_model=WeatherHealthResponse,
    status_code=status.HTTP_200_OK,
    tags=["Weather"],
)
def get_weather_health_route() -> WeatherHealthResponse:
    try:
        return WeatherClient.get_health_status()
    except Exception as error:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(error))
