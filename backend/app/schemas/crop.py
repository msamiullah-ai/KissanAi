from pydantic import BaseModel


class CropRecommendationCreate(BaseModel):
    soil_type: str
    rainfall_mm: float
    temperature_c: float
    budget_per_acre: float


class CropRecommendationResponse(BaseModel):
    crop_name: str
    soil_type: str
    expected_yield: float
    season: str
    confidence: float
