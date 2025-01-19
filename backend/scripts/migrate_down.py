from alembic.config import Config
from alembic import command


def main():
    # revert latest migration
    alembic_cfg = Config("alembic.ini")
    command.downgrade(alembic_cfg, "-1")


if __name__ == "__main__":
    main()
