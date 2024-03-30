from alembic.config import Config
from alembic import command


def migrate():
    print("Running migrations")
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")


def main():
    migrate()


if __name__ == "__main__":
    main()
