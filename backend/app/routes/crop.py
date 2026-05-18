from fastapi import APIRouter

from ..schemas.crop import CropRecommendationCreate, CropRecommendationResponse
from ..services.crop_service import recommend_crop

router = APIRouter()


@router.post("/crops/recommend", response_model=CropRecommendationResponse, tags=["Crop"])
def recommend_crop_route(payload: CropRecommendationCreate) -> CropRecommendationResponse:
    return recommend_crop(payload)
