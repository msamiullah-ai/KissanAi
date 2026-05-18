from typing import Iterable

from app.constants import (
    DISTRICT_INTELLIGENCE,
    IDEAL_HUMIDITY_RANGES,
    IDEAL_TEMPERATURE_RANGES,
    MAX_RECOMMENDATIONS,
    RAIN_ADJUSTMENT_FACTOR,
    SEASON_COMPATIBILITY,
    SEASON_WEIGHT,
    SOIL_WEIGHT,
    WATER_AVAILABILITY_MAP,
    WATER_WEIGHT,
    WEATHER_WEIGHT,
    PROFIT_WEIGHT,
    RISK_WEIGHT,
    DISTRICT_WEIGHT,
)
from app.models.enums import RiskLevel


def normalize(value: float, minimum: float, maximum: float) -> float:
    if maximum <= minimum:
        return 0.0
    value = min(max(value, minimum), maximum)
    return (value - minimum) / (maximum - minimum)


def calculate_evapotranspiration(temperature: float, humidity: float) -> float:
    adjustment = max(0.0, 1.0 - humidity / 100.0)
    return round((0.36 * (temperature + 10.0) * adjustment), 2)


def calculate_heat_stress_score(temperature: float, humidity: float) -> float:
    stress = 0.0
    if temperature >= 34.0:
        stress += 45.0
    if humidity >= 70.0:
        stress += 25.0
    return max(min(100.0 - stress, 100.0), 0.0)


def calculate_fungal_disease_probability(temperature: float, humidity: float) -> float:
    if humidity < 65.0:
        return 5.0
    risk = (humidity - 65.0) * 1.2
    if 18.0 <= temperature <= 28.0:
        risk += 12.0
    return max(min(risk, 100.0), 0.0)


def calculate_drought_severity(rainfall: float, humidity: float) -> float:
    severity = 0.0
    if rainfall < 10.0:
        severity += 35.0
    if humidity < 40.0:
        severity += 30.0
    return max(min(severity, 100.0), 0.0)


def calculate_irrigation_urgency(water_availability: str, rainfall: float) -> float:
    availability = WATER_AVAILABILITY_MAP.get(water_availability.strip().lower(), 0.5)
    urgency = max(0.0, 1.0 - availability) * 60.0
    if rainfall < 20.0:
        urgency += 20.0
    return max(min(urgency, 100.0), 0.0)


def calculate_soil_score(soil_type: str, suitable_soil_types: Iterable[str]) -> float:
    soil_value = soil_type.strip().lower()
    suitable = [item.strip().lower() for item in suitable_soil_types]
    return 100.0 if soil_value in suitable else 55.0


def calculate_season_score(crop_season: str, selected_season: str) -> float:
    crop_season_key = crop_season.capitalize()
    selected_season_key = selected_season.capitalize()
    if selected_season_key == crop_season_key:
        return 100.0
    if selected_season_key in SEASON_COMPATIBILITY.get(crop_season_key, []):
        return 80.0
    return 40.0


def calculate_weather_score(
    season: str,
    temperature: float,
    humidity: float,
    rainfall: float,
    wind_speed: float,
    condition: str,
) -> float:
    season_key = season.capitalize()
    temp_min, temp_max = IDEAL_TEMPERATURE_RANGES.get(season_key, (15.0, 30.0))
    humidity_min, humidity_max = IDEAL_HUMIDITY_RANGES.get(season_key, (40.0, 80.0))
    temperature_score = 1.0 - abs(normalize(temperature, temp_min, temp_max) - 0.5) * 2.0
    humidity_score = 1.0 - abs(normalize(humidity, humidity_min, humidity_max) - 0.5) * 2.0
    rainfall_factor = min(rainfall / (RAIN_ADJUSTMENT_FACTOR.get(season_key, 1.0) * 100.0), 1.0)
    wind_penalty = 1.0 - min(max((wind_speed - 6.0) / 14.0, 0.0), 0.5)
    condition_factor = 1.0 if condition.lower() in {"clear", "clouds", "few clouds", "scattered clouds"} else 0.85
    score = (
        temperature_score * 0.40
        + humidity_score * 0.30
        + rainfall_factor * 0.20
        + wind_penalty * 0.07
        + condition_factor * 0.03
    ) * 100.0
    return max(min(score, 100.0), 0.0)


def calculate_irrigation_score(water_availability: str, rainfall: float) -> float:
    return calculate_water_score(water_availability, rainfall, rainfall)


def calculate_district_score(district: str, crop_name: str) -> float:
    return calculate_district_multiplier(district, crop_name)


def calculate_water_score(water_availability: str, water_requirement: float, rainfall: float) -> float:
    availability = WATER_AVAILABILITY_MAP.get(water_availability.strip().lower(), 0.5)
    requirement_balance = max(0.0, 1.0 - max(0.0, (water_requirement - rainfall) / max(water_requirement, 1.0)))
    score = (availability * 0.65 + requirement_balance * 0.35) * 100.0
    return max(min(score, 100.0), 0.0)


def calculate_profitability_score(market_price: float, average_cost: float, expected_yield: float) -> float:
    revenue = market_price * expected_yield
    margin = max(0.0, (revenue - average_cost) / max(revenue, 1.0))
    return min(max(margin, 0.0), 1.0) * 100.0


def calculate_risk_score(risk_level: RiskLevel) -> float:
    score_map = {
        RiskLevel.LOW: 100.0,
        RiskLevel.MEDIUM: 70.0,
        RiskLevel.HIGH: 35.0,
    }
    return score_map.get(risk_level, 50.0)


def calculate_district_multiplier(district: str, crop_name: str) -> float:
    district_key = district.strip().lower()
    crop_key = crop_name.strip().lower()
    return DISTRICT_INTELLIGENCE.get(district_key, {}).get(crop_key, 1.0)


def calculate_final_score(
    soil: float,
    weather: float,
    water: float,
    profit: float,
    risk: float,
    season: float,
    district_multiplier: float,
) -> float:
    base_score = (
        soil * SOIL_WEIGHT
        + weather * WEATHER_WEIGHT
        + water * WATER_WEIGHT
        + profit * PROFIT_WEIGHT
        + risk * RISK_WEIGHT
        + season * SEASON_WEIGHT
    )
    district_boost = 1.0 + max(0.0, district_multiplier - 1.0) * DISTRICT_WEIGHT
    score = base_score * district_boost
    return max(min(score, 100.0), 0.0)


def get_top_recommendations(items: list[dict]) -> list[dict]:
    return sorted(items, key=lambda entry: entry["final_score"], reverse=True)[:MAX_RECOMMENDATIONS]


def classify_water_requirement(water_requirement: float) -> str:
    if water_requirement <= 600:
        return "low"
    if water_requirement <= 1200:
        return "medium"
    return "high"


def calculate_recommendation_strength(final_score: float) -> str:
    if final_score >= 85:
        return "strong"
    if final_score >= 65:
        return "moderate"
    return "weak"


def allocate_land(recommendations: list[dict], total_area: float) -> list[dict]:
    if not recommendations or total_area <= 0:
        return []
    total_score = sum(item["final_score"] for item in recommendations)
    allocations = []
    remaining_area = total_area
    for index, item in enumerate(recommendations):
        share = item["final_score"] / total_score if total_score else 1.0 / len(recommendations)
        acreage = round(remaining_area, 2) if index == len(recommendations) - 1 else round(total_area * share, 2)
        remaining_area -= acreage
        allocations.append(
            {
                "crop_name": item["crop_name"],
                "allocation_percentage": round(share * 100.0, 1),
                "acreage_allocation": acreage,
            }
        )
    return allocations


def build_weather_alerts(
    temperature: float,
    humidity: float,
    rainfall: float,
    season: str,
    wind_speed: float,
    condition: str,
) -> list[dict]:
    alerts = []
    season_key = season.capitalize()
    temp_max = IDEAL_TEMPERATURE_RANGES.get(season_key, (0.0, 100.0))[1]
    if temperature > temp_max + 3:
        alerts.append({"message": "Heatwave conditions are present for the selected season.", "severity": "high"})
    if rainfall >= 60 and rainfall > 30:
        alerts.append({"message": "Excessive rainfall is likely; protect fields against runoff and waterlogging.", "severity": "high"})
    if rainfall <= 10 and humidity <= 35:
        alerts.append({"message": "Low rainfall and humidity indicate drought risk; optimize irrigation immediately.", "severity": "critical"})
    if wind_speed >= 8.0 or rainfall >= 30.0:
        alerts.append({"message": "Pesticide application is not recommended under current wind or rain conditions.", "severity": "medium"})
    if rainfall < 25 and humidity < 55:
        alerts.append({"message": "Irrigation optimization is needed as rainfall remains insufficient.", "severity": "medium"})
    if "thunderstorm" in condition.lower() or "storm" in condition.lower():
        alerts.append({"message": "Storm conditions detected; delay field operations and secure equipment.", "severity": "critical"})
    if not alerts:
        alerts.append({"message": "Current weather is suitable for farming operations.", "severity": "low"})
    return alerts


def build_irrigation_advice(water_availability: str, rainfall: float) -> dict:
    availability = water_availability.strip().lower()
    if availability == "low" or rainfall < 25:
        return {
            "advice_text": "Use water-saving irrigation techniques and prioritize moisture retention.",
            "recommended_actions": [
                "Install drip irrigation",
                "Mulch around crops",
                "Water during early morning",
            ],
        }
    if availability == "medium":
        return {
            "advice_text": "Maintain soil moisture and schedule irrigation based on weather predictions.",
            "recommended_actions": [
                "Monitor soil moisture daily",
                "Use sprinkler systems efficiently",
            ],
        }
    return {
        "advice_text": "Water availability is sufficient. Avoid over-irrigation and monitor drainage.",
        "recommended_actions": [
            "Check soil moisture levels regularly",
            "Prevent waterlogging",
        ],
    }
