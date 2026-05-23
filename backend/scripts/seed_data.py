from app.database.session import SessionLocal
# Models
from app.models.crop import Crop
from app.models.farm import Farm
from app.models.user import User

# Enums (assuming they are in models/enums.py)
from app.models.enums import UserRole, RiskLevel, Season


def seed_crops(session):
    crops = [
        Crop(
            crop_name="Wheat",
            season=Season.RABI,
            water_requirement=450.0,
            average_cost=25000.0,
            expected_yield=3.2,
            market_price=22000.0,
            risk_level=RiskLevel.LOW,
            suitable_soil_types=["Loamy", "Sandy Loam"],
        ),
        Crop(
            crop_name="Rice",
            season=Season.KHARIF,
            water_requirement=1200.0,
            average_cost=38000.0,
            expected_yield=4.0,
            market_price=18000.0,
            risk_level=RiskLevel.MEDIUM,
            suitable_soil_types=["Clay", "Silty Loam"],
        ),
        Crop(
            crop_name="Cotton",
            season=Season.KHARIF,
            water_requirement=700.0,
            average_cost=33000.0,
            expected_yield=2.5,
            market_price=27000.0,
            risk_level=RiskLevel.MEDIUM,
            suitable_soil_types=["Loamy", "Sandy"],
        ),
        Crop(
            crop_name="Maize",
            season=Season.KHARIF,
            water_requirement=650.0,
            average_cost=21000.0,
            expected_yield=3.6,
            market_price=15000.0,
            risk_level=RiskLevel.LOW,
            suitable_soil_types=["Loamy", "Silty"],
        ),
        Crop(
            crop_name="Sugarcane",
            season=Season.KHARIF,
            water_requirement=1800.0,
            average_cost=42000.0,
            expected_yield=8.0,
            market_price=14000.0,
            risk_level=RiskLevel.HIGH,
            suitable_soil_types=["Clay", "Loamy"],
        ),
    ]

    session.add_all(crops)


def seed_user_and_farm(session):
    user = User(
        username="punjab_farmer",
        email="farmer@kissanai.local",
        password_hash="changeme",
        full_name="Punjab Farmer",
        role=UserRole.FARMER,
    )

    session.add(user)
    session.flush()

    farm = Farm(
        user_id=user.id,
        farmer_name="Amritsar Crop Farm",
        district="Amritsar",
        land_area=50.0,
        soil_type="Loamy",
        water_availability="Moderate",
        latitude=31.6340,
        longitude=74.8723,
    )

    session.add(farm)


def run() -> None:
    with SessionLocal() as session:
        existing = session.query(Crop).count()

        if existing:
            print("Seed data already exists. Skipping.")
            return

        seed_crops(session)
        seed_user_and_farm(session)

        session.commit()

        print("Seed data inserted successfully.")


if __name__ == "__main__":
    run()
