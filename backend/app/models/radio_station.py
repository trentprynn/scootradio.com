from app.enums.radio_station_playlist_type import RadioStationPlaylistType
from sqlalchemy import String, Index, Enum
from app.models.base import Base
from sqlalchemy.orm import Mapped, mapped_column


class RadioStationModel(Base):
    __tablename__ = "radio_station"

    name: Mapped[str] = mapped_column(String, primary_key=True, unique=True, index=True)
    display_name: Mapped[str] = mapped_column(String)
    stream_url: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    image_url: Mapped[str] = mapped_column(String)
    playlist_type: Mapped[RadioStationPlaylistType | None] = mapped_column(
        Enum(RadioStationPlaylistType, name="radio_station_playlist_type"),
        nullable=True,
        default=None,
    )
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
                self.image_url == other.image_url,
                self.playlist_type == other.playlist_type,
                self.playlist_url == other.playlist_url,
            ]
        )
