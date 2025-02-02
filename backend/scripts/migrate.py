import asyncio
import structlog
import subprocess
from .wait_db import wait_db

log = structlog.get_logger()


def migrate():
    log.info("running migrations")
    try:
        migration_result = subprocess.run(
            ["alembic", "upgrade", "head"], check=False, capture_output=True, text=True
        )
        if migration_result.returncode != 0:
            log.error("Migration errors:")
            log.error(migration_result.stdout)
            log.error(migration_result.stderr)
        else:
            log.info("migrations complete")
    except Exception as e:
        log.error("Error occurred during migration: %s", e)


async def entrypoint() -> None:
    await wait_db()
    migrate()


def main():
    asyncio.run(entrypoint())


if __name__ == "__main__":
    main()
