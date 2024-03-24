from alembic.config import Config
from alembic import command


def main():
    message = input("Enter migration message: ").strip()
    alembic_cfg = Config("alembic.ini")
    command.revision(alembic_cfg, message, autogenerate=True)


if __name__ == "__main__":
    main()
