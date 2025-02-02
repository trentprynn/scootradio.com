from typing import Optional
from pydantic import BaseModel, ConfigDict


class RadioStationDTO(BaseModel):
    name: str
    display_name: str
    stream_url: str
    description: str
    image_url: str
    playlist_url: Optional[str]

    model_config = ConfigDict(from_attributes=True)
