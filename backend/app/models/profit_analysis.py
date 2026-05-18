import uuid

from sqlalchemy import Column, Float, ForeignKey, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from ..database.base import Base


class ProfitAnalysis(Base):
    __tablename__ = "profit_analyses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False, unique=True)
    farm_id = Column(UUID(as_uuid=True), ForeignKey("farms.id", ondelete="CASCADE"), nullable=False, index=True)
    crop_id = Column(UUID(as_uuid=True), ForeignKey("crops.id", ondelete="SET NULL"), nullable=True, index=True)
    analyst_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    estimated_revenue = Column(Float, nullable=False)
    estimated_cost = Column(Float, nullable=False)
    estimated_profit = Column(Float, nullable=False)

    farm = relationship("Farm", back_populates="profit_analyses")
    crop = relationship("Crop", back_populates="profit_analyses")
    analyst = relationship("User", back_populates="profit_analyses")

    __table_args__ = (Index("idx_profit_analysis_farm_id", "farm_id"),)
