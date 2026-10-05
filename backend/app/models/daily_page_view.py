from datetime import date

from sqlalchemy import Date, Integer, text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class DailyPageView(Base):
    __tablename__ = "daily_page_views"

    view_date: Mapped[date] = mapped_column(Date, primary_key=True)
    views: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
        server_default=text("0"),
    )
