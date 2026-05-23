from fastapi import APIRouter

from ..schemas.health import HealthResponse
from ..services.health_service import get_health_status

router = APIRouter()


@router.get(
    "/health",
    response_model=HealthResponse,
    tags=["Health"],
    summary="Backend health check",
    description="Returns the application health status used by local development and monitoring probes.",
)
def health_check() -> HealthResponse:
    return get_health_status()
