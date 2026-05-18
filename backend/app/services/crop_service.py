from ..schemas.crop import CropRecommendationCreate, CropRecommendationResponse


def recommend_crop(payload: CropRecommendationCreate) -> CropRecommendationResponse:
    return CropRecommendationResponse(
        crop_name="Wheat",
        soil_type=payload.soil_type,
        expected_yield=3.5,
        season="Rabi",
        confidence=0.75,
    )
