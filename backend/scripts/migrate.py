import logging
from alembic.config import Config
from alembic import command
from .prestart import prestart

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def migrate():
    logger.info("started")
    prestart()
    logger.info("running migrations")
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")


def main():
    migrate()


if __name__ == "__main__":
    main()
