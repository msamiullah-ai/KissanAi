import uuid

from sqlalchemy import Boolean, Column, Enum as SQLEnum, Index, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from ..database.base import Base
from .enums import UserRole


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False, unique=True)
    username = Column(String(80), nullable=False, unique=True, index=True)
    email = Column(String(128), nullable=False, unique=True, index=True)
    password_hash = Column(String(256), nullable=False)
    full_name = Column(String(150), nullable=True)
    role = Column(
        SQLEnum(UserRole, name="user_role", native_enum=True, values_callable=lambda obj: [e.value for e in obj]), 
        nullable=False, 
        server_default=UserRole.FARMER.value
    )
    is_active = Column(Boolean, nullable=False, server_default="true")

    farms = relationship("Farm", back_populates="owner", cascade="all, delete-orphan")
    recommendations = relationship("Recommendation", back_populates="author", cascade="all, delete-orphan")
    profit_analyses = relationship("ProfitAnalysis", back_populates="analyst", cascade="all, delete-orphan")
    irrigation_alerts = relationship("IrrigationAlert", back_populates="reporter", cascade="all, delete-orphan")

    __table_args__ = (Index("idx_user_email", "email"),)