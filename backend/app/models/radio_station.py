from sqlalchemy import String, Index
from app.models.base import Base
from sqlalchemy.orm import mapped_column


class RadioStationModel(Base):
    __tablename__ = "radio_station"

    name = mapped_column(String, primary_key=True, unique=True, index=True)
    display_name = mapped_column(String)
    stream_url = mapped_column(String)
    description = mapped_column(String)
    image_url = mapped_column(String)

    __table_args__ = (Index("idx_name", "name", unique=True),)
