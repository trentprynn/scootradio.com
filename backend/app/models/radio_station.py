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
            ]
        )
