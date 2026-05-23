from enum import Enum


class UserRole(Enum):
    FARMER = "farmer"
    AGRONOMIST = "agronomist"
    ADMIN = "admin"


class Season(Enum):
    RABI = "rabi"
    KHARIF = "kharif"
    ZAID = "zaid"
    PERENNIAL = "perennial"


class RiskLevel(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class AlertType(Enum):
    UNDER_WATERING = "under_watering"
    OVER_WATERING = "over_watering"
    DISEASE = "disease"
    WEATHER_ALERT = "weather_alert"


class AlertSeverity(Enum):
    INFO = "info"
    WARNING = "warning"
    CRITICAL = "critical"
