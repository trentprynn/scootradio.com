import logging
import subprocess
from .wait_db import wait_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def migrate():
    logger.info("running migrations")
    try:
        migration_result = subprocess.run(
            ["alembic", "upgrade", "head"], check=False, capture_output=True, text=True
        )
        if migration_result.returncode != 0:
            logger.error("Migration errors:")
            logger.error(migration_result.stdout)
            logger.error(migration_result.stderr)
        else:
            logger.info("migrations complete")
    except Exception as e:
        logger.error("Error occurred during migration: %s", e)


def main():
    wait_db()
    migrate()


if __name__ == "__main__":
    main()
