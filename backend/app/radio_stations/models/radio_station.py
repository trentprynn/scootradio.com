from datetime import datetime

from app.base.models.base import Base
from sqlalchemy import DateTime, Index, String
from sqlalchemy.orm import Mapped, mapped_column


class RadioStationModel(Base):
    __tablename__ = "radio_station"

    name: Mapped[str] = mapped_column(String, primary_key=True, unique=True, index=True)
    display_name: Mapped[str] = mapped_column(String, index=True)
    stream_url: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    long_description: Mapped[str] = mapped_column(String)
    image_url: Mapped[str] = mapped_column(String)
    call_sign: Mapped[str] = mapped_column(String)
    frequency: Mapped[str] = mapped_column(String)
    city: Mapped[str] = mapped_column(String)
    region: Mapped[str] = mapped_column(String)
    country: Mapped[str] = mapped_column(String)
    website_url: Mapped[str] = mapped_column(String)
    format: Mapped[str] = mapped_column(String)
    tagline: Mapped[str] = mapped_column(String)
    seo_title: Mapped[str] = mapped_column(String)
    seo_description: Mapped[str] = mapped_column(String)
    content_updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    playlist_url: Mapped[str | None] = mapped_column(
        String, nullable=True, default=None
    )

    __table_args__ = (Index("idx_name", "name", unique=True),)

    def __repr__(self):
        return f"<RadioStationModel(name={self.name}, display_name={self.display_name}, stream_url={self.stream_url})>"

    def __str__(self):
        return self.display_name

    def __eq__(self, other):
        if not isinstance(other, RadioStationModel):
            return NotImplemented
        return all(
            [
                self.name == other.name,
                self.display_name == other.display_name,
                self.stream_url == other.stream_url,
                self.description == other.description,
                self.long_description == other.long_description,
                self.image_url == other.image_url,
                self.call_sign == other.call_sign,
                self.frequency == other.frequency,
                self.city == other.city,
                self.region == other.region,
                self.country == other.country,
                self.website_url == other.website_url,
                self.format == other.format,
                self.tagline == other.tagline,
                self.seo_title == other.seo_title,
                self.seo_description == other.seo_description,
                self.content_updated_at == other.content_updated_at,
                self.playlist_url == other.playlist_url,
            ]
        )
