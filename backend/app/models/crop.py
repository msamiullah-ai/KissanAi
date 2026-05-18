import uuid

from sqlalchemy import ARRAY, Column, Enum, Float, Index, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from ..database.base import Base
from .enums import RiskLevel, Season


class Crop(Base):
    __tablename__ = "crops"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False, unique=True)
    crop_name = Column(String(120), nullable=False, index=True)
    season = Column(Enum(Season, name="crop_season", native_enum=True), nullable=False)
    water_requirement = Column(Float, nullable=False)
    average_cost = Column(Float, nullable=False)
    expected_yield = Column(Float, nullable=False)
    market_price = Column(Float, nullable=False)
    risk_level = Column(Enum(RiskLevel, name="risk_level", native_enum=True), nullable=False)
    suitable_soil_types = Column(ARRAY(String), nullable=False, default=list)

    recommendations = relationship("Recommendation", back_populates="crop", cascade="all, delete-orphan")
    land_allocations = relationship("LandAllocation", back_populates="crop", cascade="all, delete-orphan")
    profit_analyses = relationship("ProfitAnalysis", back_populates="crop", cascade="all, delete-orphan")

    __table_args__ = (Index("idx_crop_name", "crop_name"),)
