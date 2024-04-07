import logging
from sqlalchemy import text
from sqlalchemy.orm import Session
from tenacity import retry, stop_after_attempt, wait_fixed

from app.core.db import engine

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@retry(
    stop=stop_after_attempt(5),
    wait=wait_fixed(3),
)
def wait_db() -> None:
    logger.info("attempting to connect to database...")
    try:
        with Session(engine) as session:
            session.execute(text("SELECT 1"))
            logger.info("database connection successful")
    except Exception as e:
        logger.error(f"failed to connect to database: {e}")
        raise e


def main():
    wait_db()


if __name__ == "__main__":
    main()
