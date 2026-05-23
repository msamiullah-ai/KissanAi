from datetime import datetime
from typing import Any, Dict, List, Sequence

from app.constants import WEATHER_WEIGHT
from app.database.session import SessionLocal
from app.models.crop import Crop
from app.models.farm import Farm
from app.models.enums import RiskLevel as ModelRiskLevel
from app.schemas.recommendation import (
    FarmAnalysisResponse,
    IrrigationAdviceResponse,
    LandAllocationResponse,
    ProfitInsightResponse,
    RecommendationRequest,
    RecommendationResponse,
    RecommendationStrength,
    RiskLevel,
    WaterRequirement,
    WeatherAlertResponse,
    CropRecommendationResponse,
)
from app.schemas.weather import WeatherResponse
from app.services.weather_service import WeatherClient, WeatherServiceError
from app.utils.confidence import calculate_confidence_score
from app.utils.explanation_engine import (
    generate_crop_explanation,
    generate_irrigation_reasoning,
    generate_risk_explanation,
    generate_weather_reasoning,
)
from app.utils.scoring import (
    allocate_land,
    build_irrigation_advice,     # <-- Added missing import
    build_weather_alerts,        # <-- Added missing import
    calculate_district_multiplier,
    calculate_final_score,
    calculate_profitability_score,
    calculate_recommendation_strength,
    calculate_risk_score,
    calculate_season_score,
    calculate_soil_score,
    calculate_water_score,
    calculate_weather_score,
    classify_water_requirement,
    get_top_recommendations,
)


def _build_farm_analysis(payload: RecommendationRequest, weather_summary: str) -> FarmAnalysisResponse:
    """Construct a farm analysis response from the request payload."""
    return FarmAnalysisResponse(
        district=payload.district,
        season=payload.season,
        soil_type=payload.soil_type,
        land_area=payload.land_area,
        water_availability=payload.water_availability,
        weather_summary=weather_summary,
    )


def _build_profit_summary(recommendations: Sequence[Dict[str, Any]], land_area: float) -> ProfitInsightResponse:
    """Build aggregated profit summary for the recommended crop set."""
    total_profit = sum(item["expected_profit"] for item in recommendations)  # <-- Changed here
    average_profit = round(total_profit / max(land_area, 1.0), 2)
    highest = max(recommendations, key=lambda item: item["expected_profit"], default=None)  # <-- Changed here
    return ProfitInsightResponse(
        total_expected_profit=round(total_profit, 2),
        average_profit_per_acre=average_profit,
        highest_profit_crop=highest["crop_name"] if highest else "N/A",
    )


def _build_recommendation_reasons(
    soil_score: float,
    season_score: float,
    water_score: float,
    weather_score: float,
    profitability_score: float,
    risk_score: float,
    district_multiplier: float,
) -> List[str]:
    """Create reason list explaining the recommendation decision factors."""
    reasons: List[str] = []
    if soil_score >= 85:
        reasons.append("Strong soil compatibility")
    else:
        reasons.append("Soil compatibility is moderate")

    if season_score >= 80:
        reasons.append("Season is highly compatible")
    else:
        reasons.append("Season compatibility may impact yield")

    if water_score >= 70:
        reasons.append("Available water supports the crop")
    else:
        reasons.append("Water availability is a limiting factor")

    if weather_score >= 70:
        reasons.append("Weather conditions are favorable")
    else:
        reasons.append("Weather conditions are challenging")

    if profitability_score >= 60:
        reasons.append("Expected profitability is strong")
    else:
        reasons.append("Profitability is modest")

    if risk_score < 60:
        reasons.append("Risk is elevated for this crop")
    else:
        reasons.append("Risk is manageable")

    if district_multiplier > 1.0:
        reasons.append("District intelligence increases suitability")

    return reasons


def _build_crop_payload(
    payload: RecommendationRequest,
    crop: Crop,
    temperature: float,
    humidity: float,
    rainfall: float,
    wind_speed: float,
    condition: str,
) -> Dict[str, Any]:
    soil_score = calculate_soil_score(payload.soil_type, crop.suitable_soil_types)
    season_score = calculate_season_score(crop.season.value, payload.season)
    weather_score = calculate_weather_score(payload.season, temperature, humidity, rainfall, wind_speed, condition)
    water_score = calculate_water_score(payload.water_availability, crop.water_requirement, rainfall)
    profitability_score = calculate_profitability_score(crop.market_price, crop.average_cost, crop.expected_yield)
    risk_score = calculate_risk_score(crop.risk_level)
    district_multiplier = calculate_district_multiplier(payload.district, crop.crop_name)
    final_score = calculate_final_score(
        soil_score,
        weather_score,
        water_score,
        profitability_score,
        risk_score,
        season_score,
        district_multiplier,
    )
    predicted_profit = max((crop.market_price * crop.expected_yield - crop.average_cost) * payload.land_area, 0.0)
    water_requirement = classify_water_requirement(crop.water_requirement)
    explanation = generate_crop_explanation(
        crop.crop_name,
        soil_score,
        season_score,
        water_score,
        weather_score,
        profitability_score,
        risk_score,
        district_multiplier,
    )
    recommendation_reasons = _build_recommendation_reasons(
        soil_score,
        season_score,
        water_score,
        weather_score,
        profitability_score,
        risk_score,
        district_multiplier,
    )
    risk_explanation = generate_risk_explanation(risk_score)
    return {
        "crop_name": crop.crop_name,
        "suitability_score": round(final_score, 2),
        "confidence_score": round(calculate_confidence_score(soil_score, weather_score, season_score, profitability_score, risk_score), 2),
        "expected_profit": round(predicted_profit, 2),
        "estimated_yield": crop.expected_yield,
        "risk_level": RiskLevel(crop.risk_level.value),
        "water_requirement": WaterRequirement(water_requirement),
        "weather_compatibility": round(weather_score, 2),
        "explanation": f"{explanation} {risk_explanation}",
        "recommendation_reasons": recommendation_reasons,
        "recommendation_strength": RecommendationStrength(
            calculate_recommendation_strength(final_score)
        ),
        "score_breakdown": {
                "soil_score": round(soil_score, 2),
                "weather_score": round(weather_score, 2),
                "water_score": round(water_score, 2),
                "profit_score": round(profitability_score, 2),
                "risk_score": round(risk_score, 2),
                "season_score": round(season_score, 2),
                "district_multiplier": round(district_multiplier, 2),
                "final_score": round(final_score, 2),
                "weather_contribution": round(weather_score * WEATHER_WEIGHT, 2),
            },
        "final_score": final_score,
    }


def generate_recommendations(payload: RecommendationRequest) -> RecommendationResponse:
    """Generate the complete recommendation payload for the request."""
    with SessionLocal() as session:
        crops: List[Crop] = session.query(Crop).all()

    try:
        weather_info: WeatherResponse = WeatherClient.get_weather_for_district(payload.district)
        temperature = weather_info.temperature
        humidity = weather_info.humidity
        rainfall = weather_info.rainfall_mm
        wind_speed = weather_info.wind_speed
        condition = weather_info.condition
        weather_summary = (
            f"{weather_info.condition_description.capitalize()} with {temperature}°C, "
            f"{humidity}% humidity and {weather_info.rainfall_chance}% chance of rain."
        )
    except WeatherServiceError:
        temperature = payload.temperature
        humidity = payload.humidity
        rainfall = payload.rainfall
        wind_speed = getattr(payload, "wind_speed", 0.0)
        condition = "Unknown"
        weather_summary = "Live weather unavailable; using provided farm conditions."

    scored = [
        _build_crop_payload(payload, crop, temperature, humidity, rainfall, wind_speed, condition)
        for crop in crops
    ]
    recommendation_items = get_top_recommendations(scored)
    allocations = allocate_land(recommendation_items, payload.land_area)
    weather_alerts = [
        WeatherAlertResponse(**alert)
        for alert in build_weather_alerts(temperature, humidity, rainfall, payload.season, wind_speed, condition)
    ]
    irrigation_data = build_irrigation_advice(payload.water_availability, rainfall)
    irrigation_reasoning = generate_irrigation_reasoning(payload.water_availability, rainfall)
    irrigation_data["advice_text"] = f"{irrigation_reasoning} {irrigation_data['advice_text']}"
    profit_summary = _build_profit_summary(recommendation_items, payload.land_area)
    weather_reasoning = generate_weather_reasoning(temperature, humidity, rainfall, payload.season, wind_speed, condition)
    farm_analysis = _build_farm_analysis(payload, weather_summary)
    generated_at = datetime.utcnow()
    ai_confidence = round(
        sum(item["confidence_score"] for item in recommendation_items) / max(len(recommendation_items), 1),
        2,
    )

    return RecommendationResponse(
        farm_analysis=farm_analysis,
        recommended_crops=[CropRecommendationResponse(**item) for item in recommendation_items],
        land_allocation=[LandAllocationResponse(**allocation) for allocation in allocations],
        weather_alerts=weather_alerts,
        irrigation_advice=IrrigationAdviceResponse(**irrigation_data),
        profitability_summary=profit_summary,
        generated_at=generated_at,
        ai_confidence_score=ai_confidence,
    )
