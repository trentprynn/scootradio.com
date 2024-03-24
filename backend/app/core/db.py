from sqlalchemy import create_engine

from app.core.config import settings

engine = create_engine(url=str(settings.SQLALCHEMY_DATABASE_URI))
