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


def get_cache() -> Cache:
    cache = Cache(
        Cache.REDIS,
        endpoint=settings.REDISHOST,
        port=settings.REDISPORT,
        namespace="scootradio_backend",
    )
    return cache


CacheDep = Annotated[Cache, Depends(get_cache)]
