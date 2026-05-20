import asyncio
import structlog
from alembic import command
from alembic.config import Config
from .wait_db import wait_db

log = structlog.get_logger()


def migrate():
    log.info("running migrations")
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")
    log.info("migrations complete")


async def entrypoint() -> None:
    await wait_db()
    migrate()


def main():
    asyncio.run(entrypoint())


if __name__ == "__main__":
    main()
