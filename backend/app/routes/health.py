from fastapi import APIRouter

from ..schemas.health import HealthResponse
from ..services.health_service import get_health_status

router = APIRouter()


@router.get("/health", response_model=HealthResponse, tags=["Health"])
def health_check() -> HealthResponse:
    return get_health_status()
