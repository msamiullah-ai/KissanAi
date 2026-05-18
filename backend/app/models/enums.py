from enum import Enum


class UserRole(Enum):
    FARMER = "farmer"
    AGRONOMIST = "agronomist"
    ADMIN = "admin"


class Season(Enum):
    RABI = "Rabi"
    KHARIF = "Kharif"
    ZAID = "Zaid"


class RiskLevel(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class AlertType(Enum):
    SOIL_MOISTURE = "soil_moisture"
    RAINFALL = "rainfall"
    TEMPERATURE = "temperature"
    CUSTOM = "custom"


class AlertSeverity(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"
