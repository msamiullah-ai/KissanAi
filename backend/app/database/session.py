from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from ..config import AppConfig

config = AppConfig()
engine = create_engine(
    config.database_url,
    pool_pre_ping=True,
    pool_size=20,
    max_overflow=10,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
