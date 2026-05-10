from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class RadioStationDTO(BaseModel):
    name: str
    display_name: str
    stream_url: str
    description: str
    long_description: str
    image_url: str
    call_sign: str
    frequency: str
    city: str
    region: str
    country: str
    website_url: str
    format: str
    tagline: str
    seo_title: str
    seo_description: str
    content_updated_at: datetime
    playlist_url: Optional[str]

    model_config = ConfigDict(from_attributes=True)
