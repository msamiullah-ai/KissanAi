import uuid

from sqlalchemy import Column, Float, ForeignKey, Index, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from ..database.base import Base


class Farm(Base):
    __tablename__ = "farms"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False, unique=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    farmer_name = Column(String(150), nullable=False, index=True)
    district = Column(String(120), nullable=False, index=True)
    land_area = Column(Float, nullable=False)
    soil_type = Column(String(80), nullable=False)
    water_availability = Column(String(80), nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    owner = relationship("User", back_populates="farms")
    weather_data = relationship("WeatherData", back_populates="farm", cascade="all, delete-orphan")
    recommendations = relationship("Recommendation", back_populates="farm", cascade="all, delete-orphan")
    land_allocations = relationship("LandAllocation", back_populates="farm", cascade="all, delete-orphan")
    profit_analyses = relationship("ProfitAnalysis", back_populates="farm", cascade="all, delete-orphan")
    irrigation_alerts = relationship("IrrigationAlert", back_populates="farm", cascade="all, delete-orphan")

    __table_args__ = (Index("idx_farm_district", "district"),)
