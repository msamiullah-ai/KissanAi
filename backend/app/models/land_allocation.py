import uuid

from sqlalchemy import Column, Float, ForeignKey, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from ..database.base import Base


class LandAllocation(Base):
    __tablename__ = "land_allocations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False, unique=True)
    farm_id = Column(UUID(as_uuid=True), ForeignKey("farms.id", ondelete="CASCADE"), nullable=False, index=True)
    crop_id = Column(UUID(as_uuid=True), ForeignKey("crops.id", ondelete="SET NULL"), nullable=True, index=True)
    crop_percentage = Column(Float, nullable=False)
    acreage_allocation = Column(Float, nullable=False)

    farm = relationship("Farm", back_populates="land_allocations")
    crop = relationship("Crop", back_populates="land_allocations")

    __table_args__ = (Index("idx_land_allocation_farm_id", "farm_id"),)
