import uuid

from sqlalchemy import Column, Float, ForeignKey, Index, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from ..database.base import Base


class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False, unique=True)
    farm_id = Column(UUID(as_uuid=True), ForeignKey("farms.id", ondelete="CASCADE"), nullable=False, index=True)
    crop_id = Column(UUID(as_uuid=True), ForeignKey("crops.id", ondelete="SET NULL"), nullable=True, index=True)
    author_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    suitability_score = Column(Float, nullable=False)
    predicted_profit = Column(Float, nullable=False)
    recommendation_reason = Column(String(400), nullable=False)
    weather_risk_score = Column(Float, nullable=False)

    farm = relationship("Farm", back_populates="recommendations")
    crop = relationship("Crop", back_populates="recommendations")
    author = relationship("User", back_populates="recommendations")

    __table_args__ = (Index("idx_recommendation_farm_id", "farm_id"),)
