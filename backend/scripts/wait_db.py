import asyncio
import structlog
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from tenacity import retry, stop_after_attempt, wait_fixed
from app.core.db import engine

log = structlog.get_logger()


@retry(stop=stop_after_attempt(5), wait=wait_fixed(3))
async def wait_db() -> None:
    log.info("attempting to connect to database...")
    try:
        async with AsyncSession(engine) as session:
            await session.execute(text("SELECT 1"))
            log.info("database connection successful")
    except Exception as e:
        log.error(f"failed to connect to database: {e}")
        raise e


async def entrypoint() -> None:
    await wait_db()


def main():
    asyncio.run(entrypoint())


if __name__ == "__main__":
    main()
