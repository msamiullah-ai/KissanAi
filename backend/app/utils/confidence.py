from typing import Final

AI_CONFIDENCE_MIN: Final = 40.0
AI_CONFIDENCE_MAX: Final = 99.0


def calculate_confidence_score(
    soil_score: float,
    weather_score: float,
    season_score: float,
    profitability_score: float,
    risk_score: float,
) -> float:
    """Calculate an AI confidence score based on recommendation sub-scores."""
    base = (
        soil_score * 0.25
        + weather_score * 0.25
        + season_score * 0.20
        + profitability_score * 0.20
        + risk_score * 0.10
    )
    normalized = min(max(base, 0.0), 100.0)
    confidence = AI_CONFIDENCE_MIN + (normalized / 100.0) * (AI_CONFIDENCE_MAX - AI_CONFIDENCE_MIN)
    return round(confidence, 2)
