"""add kexp playlist type

Revision ID: 7b80750833db
Revises: 0313f809008e
Create Date: 2024-04-08 20:57:30.289049

"""
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "7b80750833db"
down_revision: Union[str, None] = "0313f809008e"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # add KEXP to postgres radio_station_playlist_type enum
    op.execute(
        "CREATE TYPE radio_station_playlist_type_temp AS ENUM ('SPINITRON', 'KEXP');"
    )
    op.execute(
        "ALTER TABLE radio_station ALTER COLUMN playlist_type TYPE radio_station_playlist_type_temp USING playlist_type::text::radio_station_playlist_type_temp;"
    )
    op.execute("DROP TYPE radio_station_playlist_type;")
    op.execute(
        "ALTER TYPE radio_station_playlist_type_temp RENAME TO radio_station_playlist_type;"
    )


def downgrade() -> None:
    # remove KEXP from postgres radio_station_playlist_type enum
    op.execute(
        "UPDATE radio_station SET playlist_type = NULL WHERE playlist_type = 'KEXP';"
    )
    op.execute("CREATE TYPE radio_station_playlist_type_temp AS ENUM ('SPINITRON');")
    op.execute(
        "ALTER TABLE radio_station ALTER COLUMN playlist_type TYPE radio_station_playlist_type_temp USING playlist_type::text::radio_station_playlist_type_temp;"
    )
    op.execute("DROP TYPE radio_station_playlist_type;")
    op.execute(
        "ALTER TYPE radio_station_playlist_type_temp RENAME TO radio_station_playlist_type;"
    )
