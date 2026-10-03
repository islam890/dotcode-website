"""add service to contact messages

Revision ID: f3a91c7d2e60
Revises: c11898264937
Create Date: 2026-10-03

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "f3a91c7d2e60"
down_revision: Union[str, Sequence[str], None] = "c11898264937"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "contact_messages",
        sa.Column("service", sa.String(length=100), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("contact_messages", "service")
