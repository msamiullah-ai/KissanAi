from datetime import datetime
from enum import Enum
from typing import List

from pydantic import BaseModel, Field


class RiskLevel(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class WaterRequirement(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class RecommendationStrength(str, Enum):
    strong = "strong"
    moderate = "moderate"
    weak = "weak"


class RecommendationRequest(BaseModel):
    district: str = Field(..., example="Lahore")
    season: str = Field(..., example="Rabi")
    soil_type: str = Field(..., example="Loamy")
    land_area: float = Field(..., example=10.0)
    water_availability: str = Field(..., example="Medium")
    temperature: float = Field(..., example=24.0)
    humidity: float = Field(..., example=60.0)
    rainfall: float = Field(..., example=40.0)


class FarmAnalysisResponse(BaseModel):
    district: str
    season: str
    soil_type: str
    land_area: float
    water_availability: str
    weather_summary: str


class ScoreBreakdown(BaseModel):
    soil_score: float
    weather_score: float
    water_score: float
    profit_score: float
    risk_score: float
    season_score: float
    district_multiplier: float
    final_score: float
    weather_contribution: float


class CropRecommendationResponse(BaseModel):
    crop_name: str
    suitability_score: float
    confidence_score: float
    expected_profit: float
    estimated_yield: float
    risk_level: RiskLevel
    water_requirement: WaterRequirement
    weather_compatibility: float
    final_score: float
    explanation: str
    recommendation_reasons: List[str]
    recommendation_strength: RecommendationStrength
    score_breakdown: ScoreBreakdown


class WeatherAlertResponse(BaseModel):
    message: str
    severity: str


class IrrigationAdviceResponse(BaseModel):
    advice_text: str
    recommended_actions: List[str]


class LandAllocationResponse(BaseModel):
    crop_name: str
    allocation_percentage: float
    acreage_allocation: float


class ProfitInsightResponse(BaseModel):
    total_expected_profit: float
    average_profit_per_acre: float
    highest_profit_crop: str


class RecommendationResponse(BaseModel):
    farm_analysis: FarmAnalysisResponse
    recommended_crops: List[CropRecommendationResponse]
    land_allocation: List[LandAllocationResponse]
    weather_alerts: List[WeatherAlertResponse]
    irrigation_advice: IrrigationAdviceResponse
    profitability_summary: ProfitInsightResponse
    generated_at: datetime
    ai_confidence_score: float
