from alembic.config import Config
from alembic import command


def create_migration():
    message = input("Enter migration message: ").strip()
    alembic_cfg = Config("alembic.ini")
    command.revision(alembic_cfg, message, autogenerate=True)


def entrypoint() -> None:
    create_migration()


def main():
    entrypoint()


if __name__ == "__main__":
    main()
