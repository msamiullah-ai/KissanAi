"""initial migration

Revision ID: 0001_initial
Revises: None
Create Date: 2026-05-17 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "0001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # 1. Pre-create ALL Postgres Enum Types safely
    postgresql.ENUM('farmer', 'agronomist', 'admin', name='user_role').create(op.get_bind(), checkfirst=True)
    postgresql.ENUM('kharif', 'rabi', 'zaid', 'perennial', name='crop_season').create(op.get_bind(), checkfirst=True)
    postgresql.ENUM('low', 'medium', 'high', name='risk_level').create(op.get_bind(), checkfirst=True)
    postgresql.ENUM('under_watering', 'over_watering', 'disease', 'weather_alert', name='alert_type').create(op.get_bind(), checkfirst=True)
    postgresql.ENUM('info', 'warning', 'critical', name='alert_severity').create(op.get_bind(), checkfirst=True)
    
    # 2. Create tables using the pre-created enums cleanly
    op.create_table(
        "users",
        sa.Column("id", sa.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("username", sa.String(length=80), nullable=False, unique=True),
        sa.Column("email", sa.String(length=128), nullable=False, unique=True),
        sa.Column("password_hash", sa.String(length=256), nullable=False),
        sa.Column("full_name", sa.String(length=150), nullable=True),
        sa.Column("role", postgresql.ENUM('farmer', 'agronomist', 'admin', name='user_role', create_type=False), server_default="farmer", nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_index("idx_user_email", "users", ["email"])

    op.create_table(
        "farms",
        sa.Column("id", sa.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("user_id", sa.UUID(as_uuid=True), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("farmer_name", sa.String(length=150), nullable=False),
        sa.Column("district", sa.String(length=120), nullable=False),
        sa.Column("land_area", sa.Float(), nullable=False),
        sa.Column("soil_type", sa.String(length=80), nullable=False),
        sa.Column("water_availability", sa.String(length=80), nullable=False),
        sa.Column("latitude", sa.Float(), nullable=True),
        sa.Column("longitude", sa.Float(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_index("idx_farm_district", "farms", ["district"])

    op.create_table(
        "crops",
        sa.Column("id", sa.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("crop_name", sa.String(length=120), nullable=False),
        sa.Column("season", postgresql.ENUM('kharif', 'rabi', 'zaid', 'perennial', name='crop_season', create_type=False), nullable=False),
        sa.Column("water_requirement", sa.Float(), nullable=False),
        sa.Column("average_cost", sa.Float(), nullable=False),
        sa.Column("expected_yield", sa.Float(), nullable=False),
        sa.Column("market_price", sa.Float(), nullable=False),
        sa.Column("risk_level", postgresql.ENUM('low', 'medium', 'high', name='risk_level', create_type=False), nullable=False),
        sa.Column("suitable_soil_types", sa.ARRAY(sa.String()), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_index("idx_crop_name", "crops", ["crop_name"])

    op.create_table(
        "weather_data",
        sa.Column("id", sa.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("farm_id", sa.UUID(as_uuid=True), sa.ForeignKey("farms.id", ondelete="CASCADE"), nullable=False),
        sa.Column("captured_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("temperature_c", sa.Float(), nullable=True),
        sa.Column("humidity_pct", sa.Float(), nullable=True),
        sa.Column("rainfall_mm", sa.Float(), nullable=True),
        sa.Column("wind_speed_mps", sa.Float(), nullable=True),
        sa.Column("condition", sa.String(length=120), nullable=True),
        sa.Column("source", sa.String(length=120), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_index("idx_weather_data_farm_id", "weather_data", ["farm_id"])

    op.create_table(
        "recommendations",
        sa.Column("id", sa.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("farm_id", sa.UUID(as_uuid=True), sa.ForeignKey("farms.id", ondelete="CASCADE"), nullable=False),
        sa.Column("crop_id", sa.UUID(as_uuid=True), sa.ForeignKey("crops.id", ondelete="SET NULL"), nullable=True),
        sa.Column("author_id", sa.UUID(as_uuid=True), sa.ForeignKey("users.id", ondelete="SET NULL"), nullable=True),
        sa.Column("suitability_score", sa.Float(), nullable=False),
        sa.Column("predicted_profit", sa.Float(), nullable=False),
        sa.Column("recommendation_reason", sa.String(length=400), nullable=False),
        sa.Column("weather_risk_score", sa.Float(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_index("idx_recommendation_farm_id", "recommendations", ["farm_id"])

    op.create_table(
        "land_allocations",
        sa.Column("id", sa.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("farm_id", sa.UUID(as_uuid=True), sa.ForeignKey("farms.id", ondelete="CASCADE"), nullable=False),
        sa.Column("crop_id", sa.UUID(as_uuid=True), sa.ForeignKey("crops.id", ondelete="SET NULL"), nullable=True),
        sa.Column("crop_percentage", sa.Float(), nullable=False),
        sa.Column("acreage_allocation", sa.Float(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_index("idx_land_allocation_farm_id", "land_allocations", ["farm_id"])

    op.create_table(
        "profit_analyses",
        sa.Column("id", sa.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("farm_id", sa.UUID(as_uuid=True), sa.ForeignKey("farms.id", ondelete="CASCADE"), nullable=False),
        sa.Column("crop_id", sa.UUID(as_uuid=True), sa.ForeignKey("crops.id", ondelete="SET NULL"), nullable=True),
        sa.Column("analyst_id", sa.UUID(as_uuid=True), sa.ForeignKey("users.id", ondelete="SET NULL"), nullable=True),
        sa.Column("estimated_revenue", sa.Float(), nullable=False),
        sa.Column("estimated_cost", sa.Float(), nullable=False),
        sa.Column("estimated_profit", sa.Float(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_index("idx_profit_analysis_farm_id", "profit_analyses", ["farm_id"])

    op.create_table(
        "irrigation_alerts",
        sa.Column("id", sa.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("farm_id", sa.UUID(as_uuid=True), sa.ForeignKey("farms.id", ondelete="CASCADE"), nullable=False),
        sa.Column("reporter_id", sa.UUID(as_uuid=True), sa.ForeignKey("users.id", ondelete="SET NULL"), nullable=True),
        sa.Column("alert_type", postgresql.ENUM('under_watering', 'over_watering', 'disease', 'weather_alert', name='alert_type', create_type=False), nullable=False),
        sa.Column("alert_message", sa.String(length=400), nullable=False),
        sa.Column("severity", postgresql.ENUM('info', 'warning', 'critical', name='alert_severity', create_type=False), nullable=False),
        sa.Column("weather_condition", sa.String(length=120), nullable=True),
        sa.Column("triggered_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_index("idx_irrigation_alert_farm_id", "irrigation_alerts", ["farm_id"])


def downgrade() -> None:
    op.drop_index("idx_irrigation_alert_farm_id", table_name="irrigation_alerts")
    op.drop_table("irrigation_alerts")
    op.drop_index("idx_profit_analysis_farm_id", table_name="profit_analyses")
    op.drop_table("profit_analyses")
    op.drop_index("idx_land_allocation_farm_id", table_name="land_allocations")
    op.drop_table("land_allocations")
    op.drop_index("idx_recommendation_farm_id", table_name="recommendations")
    op.drop_table("recommendations")
    op.drop_index("idx_weather_data_farm_id", table_name="weather_data")
    op.drop_table("weather_data")
    op.drop_index("idx_crop_name", table_name="crops")
    op.drop_table("crops")
    op.drop_index("idx_farm_district", table_name="farms")
    op.drop_table("farms")
    op.drop_index("idx_user_email", table_name="users")
    op.drop_table("users")
    
    postgresql.ENUM(name="alert_severity").drop(op.get_bind(), checkfirst=True)
    postgresql.ENUM(name="alert_type").drop(op.get_bind(), checkfirst=True)
    postgresql.ENUM(name="risk_level").drop(op.get_bind(), checkfirst=True)
    postgresql.ENUM(name="crop_season").drop(op.get_bind(), checkfirst=True)
    postgresql.ENUM(name="user_role").drop(op.get_bind(), checkfirst=True)
    