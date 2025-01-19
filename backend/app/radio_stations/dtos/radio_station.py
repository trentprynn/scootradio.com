from typing import Optional
from pydantic import BaseModel
from app.radio_stations.models.radio_station import RadioStationModel


class RadioStationDTO(BaseModel):
    name: str
    display_name: str
    stream_url: str
    description: str
    image_url: str
    starting_volume: int
    playlist_url: Optional[str]

    class Config:
        exclude_none = False

    @classmethod
    def from_orm(cls, orm_object: RadioStationModel):
        return cls(
            name=orm_object.name,
            display_name=orm_object.display_name,
            stream_url=orm_object.stream_url,
            description=orm_object.description,
            image_url=orm_object.image_url,
            starting_volume=orm_object.starting_volume,
            playlist_url=orm_object.playlist_url,
        )
