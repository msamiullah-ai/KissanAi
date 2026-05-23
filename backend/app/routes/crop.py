from fastapi import APIRouter, status

from app.schemas.crop import DeprecatedEndpointResponse

router = APIRouter()


@router.post(
    "/crops/recommend",
    response_model=DeprecatedEndpointResponse,
    status_code=status.HTTP_410_GONE,
    tags=["Deprecated"],
    summary="Deprecated crop recommendation endpoint",
    description="Retired compatibility endpoint. Use POST /api/recommendations/generate for all recommendation requests.",
    deprecated=True,
)
def recommend_crop_route() -> DeprecatedEndpointResponse:
    return DeprecatedEndpointResponse(
        status="deprecated",
        message="The crop recommendation endpoint has been retired.",
        replacement_endpoint="POST /api/recommendations/generate",
    )
