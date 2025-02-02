from typing import Annotated, AsyncGenerator
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker
from aiocache import Cache  # type: ignore  # https://github.com/aio-libs/aiocache/issues/512
from app.core.config import settings
from app.core.db import engine

async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


SessionDep = Annotated[AsyncSession, Depends(get_session)]


async def get_cache() -> AsyncGenerator[Cache, None]:
    cache = Cache.from_url(settings.REDIS_URL)
    try:
        yield cache
    finally:
        await cache.close()


CacheDep = Annotated[Cache, Depends(get_cache)]
