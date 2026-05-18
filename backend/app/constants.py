from typing import Final

SOIL_WEIGHT: Final = 0.30
WEATHER_WEIGHT: Final = 0.25
WATER_WEIGHT: Final = 0.20
PROFIT_WEIGHT: Final = 0.15
RISK_WEIGHT: Final = 0.10
SEASON_WEIGHT: Final = 0.10
DISTRICT_WEIGHT: Final = 0.05

WATER_AVAILABILITY_MAP: Final = {
    "low": 0.35,
    "medium": 0.70,
    "high": 1.00,
}

IDEAL_TEMPERATURE_RANGES: Final = {
    "Rabi": (10.0, 25.0),
    "Kharif": (20.0, 32.0),
    "Zaid": (22.0, 34.0),
}

IDEAL_HUMIDITY_RANGES: Final = {
    "Rabi": (30.0, 65.0),
    "Kharif": (55.0, 85.0),
    "Zaid": (50.0, 80.0),
}

RAIN_ADJUSTMENT_FACTOR: Final = {
    "Rabi": 1.0,
    "Kharif": 1.2,
    "Zaid": 1.1,
}

SEASON_COMPATIBILITY: Final = {
    "Rabi": ["Rabi"],
    "Kharif": ["Kharif"],
    "Zaid": ["Zaid"],
}

DISTRICT_INTELLIGENCE: Final = {
    "multan": {"cotton": 1.12},
    "faisalabad": {"wheat": 1.10},
    "sahiwal": {"maize": 1.08},
    "bahawalpur": {"wheat": 1.05, "maize": 1.05, "cotton": 1.03},
}

DISTRICT_COORDINATES: Final = {
    "lahore": (31.5497, 74.3436),
    "multan": (30.1978, 71.4716),
    "faisalabad": (31.4504, 73.1350),
    "sahiwal": (30.6700, 73.1062),
    "bahawalpur": (29.3956, 71.6836),
}

HEAT_STRESS_THRESHOLD: Final = 34.0
RAIN_ALERT_THRESHOLD: Final = 60.0
DROUGHT_RAINFALL_THRESHOLD: Final = 10.0
PESTICIDE_WIND_THRESHOLD: Final = 8.0
SAFE_CONDITIONS_THRESHOLD: Final = 30.0
IRRIGATION_OPTIMIZATION_THRESHOLD: Final = 40.0

MAX_RECOMMENDATIONS: Final = 3

IRRIGATION_NOTICE = {
    "low": "Water availability is low. Prioritize water-saving irrigation methods and drought-resistant crops.",
    "medium": "Water availability is moderate. Maintain soil moisture and use efficient irrigation schedules.",
    "high": "Water availability is sufficient. Continue monitoring and avoid excess irrigation.",
}
