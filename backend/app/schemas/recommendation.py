from datetime import datetime
from enum import Enum
from typing import List

from pydantic import BaseModel, ConfigDict, Field


class SeasonInput(str, Enum):
    rabi = "Rabi"
    kharif = "Kharif"
    zaid = "Zaid"


class WaterAvailabilityInput(str, Enum):
    low = "Low"
    medium = "Medium"
    high = "High"


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


class WeatherAlertSeverity(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"


class RecommendationRequest(BaseModel):
    district: str = Field(..., min_length=2, max_length=120, examples=["Lahore"])
    season: SeasonInput = Field(..., examples=["Rabi"])
    soil_type: str = Field(..., min_length=2, max_length=80, examples=["Loamy"])
    land_area: float = Field(..., gt=0, examples=[10.0])
    water_availability: WaterAvailabilityInput = Field(..., examples=["Medium"])
    temperature: float = Field(..., ge=-20, le=60, examples=[24.0])
    humidity: float = Field(..., ge=0, le=100, examples=[60.0])
    rainfall: float = Field(..., ge=0, examples=[40.0])

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "district": "Lahore",
                "season": "Rabi",
                "soil_type": "Loamy",
                "land_area": 10.0,
                "water_availability": "Medium",
                "temperature": 24.0,
                "humidity": 60.0,
                "rainfall": 40.0,
            }
        }
    )


class FarmAnalysisResponse(BaseModel):
    district: str = Field(..., examples=["Lahore"])
    season: str = Field(..., examples=["Rabi"])
    soil_type: str = Field(..., examples=["Loamy"])
    land_area: float = Field(..., examples=[10.0])
    water_availability: str = Field(..., examples=["Medium"])
    weather_summary: str = Field(..., examples=["Clear sky with 24.0°C, 60% humidity and 20% chance of rain."])


class ScoreBreakdown(BaseModel):
    soil_score: float = Field(..., ge=0, le=100)
    weather_score: float = Field(..., ge=0, le=100)
    water_score: float = Field(..., ge=0, le=100)
    profit_score: float = Field(..., ge=0, le=100)
    risk_score: float = Field(..., ge=0, le=100)
    season_score: float = Field(..., ge=0, le=100)
    district_multiplier: float = Field(..., ge=0)
    final_score: float = Field(..., ge=0, le=100)
    weather_contribution: float = Field(..., ge=0)


class CropRecommendationResponse(BaseModel):
    crop_name: str = Field(..., examples=["Wheat"])
    suitability_score: float = Field(..., ge=0, le=100, examples=[86.4])
    confidence_score: float = Field(..., ge=0, le=100, examples=[82.5])
    expected_profit: float = Field(..., ge=0, examples=[454000.0])
    estimated_yield: float = Field(..., ge=0, examples=[3.2])
    risk_level: RiskLevel
    water_requirement: WaterRequirement
    weather_compatibility: float = Field(..., ge=0, le=100, examples=[75.0])
    final_score: float = Field(..., ge=0, le=100, examples=[86.4])
    explanation: str = Field(..., examples=["Wheat is selected because soil compatibility is strong and risk is manageable."])
    recommendation_reasons: List[str] = Field(..., min_length=1, examples=[["Strong soil compatibility", "Risk is manageable"]])
    recommendation_strength: RecommendationStrength
    score_breakdown: ScoreBreakdown


class WeatherAlertResponse(BaseModel):
    message: str = Field(..., examples=["Current weather is suitable for farming operations."])
    severity: WeatherAlertSeverity = Field(..., examples=["low"])


class IrrigationAdviceResponse(BaseModel):
    advice_text: str = Field(..., examples=["Maintain soil moisture and schedule irrigation based on weather predictions."])
    recommended_actions: List[str] = Field(..., min_length=1, examples=[["Monitor soil moisture daily", "Use sprinkler systems efficiently"]])


class LandAllocationResponse(BaseModel):
    crop_name: str = Field(..., examples=["Wheat"])
    allocation_percentage: float = Field(..., ge=0, le=100, examples=[40.0])
    acreage_allocation: float = Field(..., ge=0, examples=[4.0])


class ProfitInsightResponse(BaseModel):
    total_expected_profit: float = Field(..., ge=0, examples=[1129000.0])
    average_profit_per_acre: float = Field(..., ge=0, examples=[112900.0])
    highest_profit_crop: str = Field(..., examples=["Wheat"])


class RecommendationResponse(BaseModel):
    farm_analysis: FarmAnalysisResponse
    recommended_crops: List[CropRecommendationResponse]
    land_allocation: List[LandAllocationResponse]
    weather_alerts: List[WeatherAlertResponse]
    irrigation_advice: IrrigationAdviceResponse
    profitability_summary: ProfitInsightResponse
    generated_at: datetime
    ai_confidence_score: float = Field(..., ge=0, le=100, examples=[75.82])

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "farm_analysis": {
                    "district": "Lahore",
                    "season": "Rabi",
                    "soil_type": "Loamy",
                    "land_area": 10.0,
                    "water_availability": "Medium",
                    "weather_summary": "Clear sky with 24.0°C, 60% humidity and 20% chance of rain.",
                },
                "recommended_crops": [
                    {
                        "crop_name": "Wheat",
                        "suitability_score": 86.4,
                        "confidence_score": 82.5,
                        "expected_profit": 454000.0,
                        "estimated_yield": 3.2,
                        "risk_level": "low",
                        "water_requirement": "low",
                        "weather_compatibility": 75.0,
                        "final_score": 86.4,
                        "explanation": "Wheat is selected because soil compatibility is strong and risk is manageable.",
                        "recommendation_reasons": ["Strong soil compatibility", "Risk is manageable"],
                        "recommendation_strength": "strong",
                        "score_breakdown": {
                            "soil_score": 100.0,
                            "weather_score": 75.0,
                            "water_score": 80.0,
                            "profit_score": 64.5,
                            "risk_score": 100.0,
                            "season_score": 100.0,
                            "district_multiplier": 1.0,
                            "final_score": 86.4,
                            "weather_contribution": 15.0,
                        },
                    }
                ],
                "land_allocation": [{"crop_name": "Wheat", "allocation_percentage": 40.0, "acreage_allocation": 4.0}],
                "weather_alerts": [{"message": "Current weather is suitable for farming operations.", "severity": "low"}],
                "irrigation_advice": {
                    "advice_text": "Maintain soil moisture and schedule irrigation based on weather predictions.",
                    "recommended_actions": ["Monitor soil moisture daily", "Use sprinkler systems efficiently"],
                },
                "profitability_summary": {
                    "total_expected_profit": 1129000.0,
                    "average_profit_per_acre": 112900.0,
                    "highest_profit_crop": "Wheat",
                },
                "generated_at": "2026-05-22T05:20:57.964281",
                "ai_confidence_score": 75.82,
            }
        }
    )
