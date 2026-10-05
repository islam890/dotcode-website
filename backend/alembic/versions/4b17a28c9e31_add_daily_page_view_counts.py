"""add daily page view counts

Revision ID: 4b17a28c9e31
Revises: f3a91c7d2e60
Create Date: 2026-10-04

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "4b17a28c9e31"
down_revision: Union[str, Sequence[str], None] = "f3a91c7d2e60"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "daily_page_views",
        sa.Column("view_date", sa.Date(), nullable=False),
        sa.Column("views", sa.Integer(), server_default="0", nullable=False),
        sa.PrimaryKeyConstraint("view_date"),
    )


def downgrade() -> None:
    op.drop_table("daily_page_views")
