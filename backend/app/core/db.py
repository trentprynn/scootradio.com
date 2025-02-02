from sqlalchemy.ext.asyncio import create_async_engine
from app.core.config import settings


engine = create_async_engine(url=settings.async_database_url, pool_pre_ping=True)
