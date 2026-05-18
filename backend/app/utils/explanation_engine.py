from typing import List


def generate_crop_explanation(
    crop_name: str,
    soil_score: float,
    season_score: float,
    water_score: float,
    weather_score: float,
    profitability_score: float,
    risk_score: float,
    district_bonus: float,
) -> str:
    """Build a human-readable recommendation explanation for a crop."""
    parts: List[str] = []
    if soil_score >= 85:
        parts.append("soil compatibility is strong")
    else:
        parts.append("soil compatibility is moderate")

    if season_score >= 85:
        parts.append("the season aligns well")
    else:
        parts.append("season compatibility is limited")

    if water_score >= 70:
        parts.append("water resources are adequate")
    else:
        parts.append("water availability is constrained")

    if weather_score >= 75:
        parts.append("weather conditions are favorable")
    else:
        parts.append("weather conditions are challenging")

    if profitability_score >= 60:
        parts.append("expected profitability is healthy")
    else:
        parts.append("expected returns are modest")

    if risk_score >= 70:
        parts.append("the crop carries low risk")
    else:
        parts.append("the crop carries moderate to high risk")

    if district_bonus > 1.0:
        parts.append("regional intelligence provides a boost for this district")

    return f"{crop_name} is selected because " + ", ".join(parts) + "."


def generate_risk_explanation(risk_score: float) -> str:
    """Generate a concise risk explanation based on the risk score."""
    if risk_score >= 80:
        return "Risk factors are low, making this recommendation stable for most conditions."
    if risk_score >= 55:
        return "Risk is moderate; monitor soil and weather carefully."
    return "Risk is elevated; use this recommendation with caution and consider protective measures."


def generate_irrigation_reasoning(water_availability: str, rainfall: float) -> str:
    """Generate irrigation reasoning based on water availability and rainfall."""
    if water_availability.lower() == "low" or rainfall < 25:
        return "Irrigation planning should prioritize efficiency and water retention."
    if water_availability.lower() == "medium":
        return "Regular irrigation will support crop health while avoiding waste."
    return "Water supply is good; focus on efficient scheduling and avoiding overwatering."


def generate_weather_reasoning(
    temperature: float,
    humidity: float,
    rainfall: float,
    season: str,
    wind_speed: float,
    condition: str,
) -> str:
    """Generate weather reasoning to add clarity to farm analysis."""
    messages: List[str] = []
    if rainfall < 25:
        messages.append("rainfall is low")
    if rainfall >= 60:
        messages.append("heavy rain is expected")
    if temperature > 32:
        messages.append("temperature is above the ideal range")
    if humidity > 85:
        messages.append("humidity is high and disease risk may increase")
    if wind_speed >= 8.0:
        messages.append("wind speed is elevated, which can affect pesticide application")
    if "storm" in condition.lower() or "thunderstorm" in condition.lower():
        messages.append("storm conditions are expected")
    if not messages:
        return "Weather conditions are generally favorable for the selected season."
    return "Weather signals show " + ", ".join(messages) + "."
