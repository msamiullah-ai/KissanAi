import uuid

from sqlalchemy import Column, DateTime, Enum, ForeignKey, Index, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from ..database.base import Base
from .enums import AlertSeverity, AlertType


class IrrigationAlert(Base):
    __tablename__ = "irrigation_alerts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False, unique=True)
    farm_id = Column(UUID(as_uuid=True), ForeignKey("farms.id", ondelete="CASCADE"), nullable=False, index=True)
    reporter_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    alert_type = Column(Enum(AlertType, name="alert_type", native_enum=True), nullable=False)
    alert_message = Column(String(400), nullable=False)
    severity = Column(Enum(AlertSeverity, name="alert_severity", native_enum=True), nullable=False)
    weather_condition = Column(String(120), nullable=True)
    triggered_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    farm = relationship("Farm", back_populates="irrigation_alerts")
    reporter = relationship("User", back_populates="irrigation_alerts")

    __table_args__ = (Index("idx_irrigation_alert_farm_id", "farm_id"),)
