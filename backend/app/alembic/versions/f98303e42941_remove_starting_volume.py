"""remove_starting_volume

Revision ID: f98303e42941
Revises: 9ce480b0af96
Create Date: 2025-01-26 06:31:13.628845

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f98303e42941'
down_revision: Union[str, None] = '9ce480b0af96'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('radio_station', 'starting_volume')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('radio_station', sa.Column('starting_volume', sa.INTEGER(), server_default=sa.text('50'), autoincrement=False, nullable=False))
    # ### end Alembic commands ###
