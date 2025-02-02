from alembic.config import Config
from alembic import command


def migrate_down():
    # revert latest migration
    alembic_cfg = Config("alembic.ini")
    command.downgrade(alembic_cfg, "-1")


def entrypoint() -> None:
    migrate_down()


def main():
    entrypoint()


if __name__ == "__main__":
    main()
