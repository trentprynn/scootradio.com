from typing import Optional
from pydantic import BaseModel


class NowPlayingDTO(BaseModel):
    song_name: Optional[str]
    album_name: Optional[str]
    artist_name: Optional[str]
    play_time: Optional[str]
    thumbnail_url: Optional[str]
