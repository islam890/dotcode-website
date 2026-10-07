"""add budget currency to contact messages

Revision ID: 8d3f6a1b2c4e
Revises: 4b17a28c9e31
Create Date: 2026-10-07

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "8d3f6a1b2c4e"
down_revision: Union[str, Sequence[str], None] = "4b17a28c9e31"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "contact_messages",
        sa.Column("budget_currency", sa.String(length=3), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("contact_messages", "budget_currency")
