"""add_display_name_index

Revision ID: eb62494eee8d
Revises: 0a5a8faf2463
Create Date: 2025-01-18 19:13:31.840046

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'eb62494eee8d'
down_revision: Union[str, None] = '0a5a8faf2463'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_index(op.f('ix_radio_station_display_name'), 'radio_station', ['display_name'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_radio_station_display_name'), table_name='radio_station')
    # ### end Alembic commands ###
