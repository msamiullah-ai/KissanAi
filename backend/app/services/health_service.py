from ..schemas.health import HealthResponse


def get_health_status() -> HealthResponse:
    return HealthResponse(status="ok", message="KissanAI backend is healthy")
