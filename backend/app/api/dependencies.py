from typing import Annotated, Generator
from fastapi import Depends
from sqlalchemy.orm import Session
from aiocache import Cache
from app.core.config import settings

from app.core.db import engine


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


async def get_cache() -> Cache:
    cache = Cache.from_url(settings.REDIS_URL)
    try:
        yield cache
    finally:
        await cache.close()


CacheDep = Annotated[Cache, Depends(get_cache)]
