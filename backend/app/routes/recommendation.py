from fastapi import APIRouter, HTTPException, status

from ..schemas.recommendation import RecommendationRequest, RecommendationResponse
from ..services.recommendation_service import generate_recommendations

router = APIRouter()


@router.post(
    "/recommendations/generate",
    response_model=RecommendationResponse,
    status_code=status.HTTP_200_OK,
    tags=["Recommendations"],
    responses={
        status.HTTP_422_UNPROCESSABLE_ENTITY: {"description": "Validation Error"},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"description": "Internal Server Error"},
    },
)
def generate_recommendations_route(payload: RecommendationRequest) -> RecommendationResponse:
    """Generate crop recommendations and farm intelligence insights."""
    try:
        return generate_recommendations(payload)
    except Exception as error:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(error))
