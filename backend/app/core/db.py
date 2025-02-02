from sqlalchemy import create_engine

from app.core.config import settings

engine = create_engine(url=settings.DATABASE_URL, pool_pre_ping=True)
