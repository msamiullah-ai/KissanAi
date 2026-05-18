from sqlalchemy import Column, DateTime, Integer, String, func

from ..database.base import Base


class HealthEvent(Base):
    __tablename__ = "health_events"

    id = Column(Integer, primary_key=True, index=True)
    status = Column(String, nullable=False)
    message = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
