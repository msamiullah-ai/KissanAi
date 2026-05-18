import uuid

from sqlalchemy import Column, DateTime, Float, ForeignKey, Index, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from ..database.base import Base


class WeatherData(Base):
    __tablename__ = "weather_data"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False, unique=True)
    farm_id = Column(UUID(as_uuid=True), ForeignKey("farms.id", ondelete="CASCADE"), nullable=False, index=True)
    captured_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    temperature_c = Column(Float, nullable=True)
    humidity_pct = Column(Float, nullable=True)
    rainfall_mm = Column(Float, nullable=True)
    wind_speed_mps = Column(Float, nullable=True)
    condition = Column(String(120), nullable=True)
    source = Column(String(120), nullable=True)

    farm = relationship("Farm", back_populates="weather_data")

    __table_args__ = (Index("idx_weather_data_farm_id", "farm_id"),)
