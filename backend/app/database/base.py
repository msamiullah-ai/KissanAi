import uuid

from sqlalchemy import Column, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base

class TimestampMixin:
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False, index=True)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

class UUIDMixin:
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False, unique=True)

class ModelMixin(TimestampMixin):
    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

    def __repr__(self):
        return f"<{self.__class__.__name__} id={getattr(self, 'id', None)}>"

Base = declarative_base(cls=ModelMixin)

# Import models after Base is defined so SQLAlchemy relationship names resolve
# consistently for Alembic metadata and local startup validation.
from ..models.crop import Crop  # noqa: F401,E402
from ..models.farm import Farm  # noqa: F401,E402
from ..models.irrigation_alert import IrrigationAlert  # noqa: F401,E402
from ..models.land_allocation import LandAllocation  # noqa: F401,E402
from ..models.profit_analysis import ProfitAnalysis  # noqa: F401,E402
from ..models.recommendation import Recommendation  # noqa: F401,E402
from ..models.user import User  # noqa: F401,E402
from ..models.weather_data import WeatherData  # noqa: F401,E402
