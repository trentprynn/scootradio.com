import pendulum
import structlog
import httpx
from app.core.constants import KEXP_NOW_PLAYING_URL
from app.radio_stations.dtos.now_playing import NowPlayingDTO
from app.radio_stations.now_playing.now_playing_base import BaseNowPlaying

log = structlog.get_logger()


class KEXPNowPlaying(BaseNowPlaying):
    def __init__(self) -> None:
        super().__init__()

    async def get_now_playing(self) -> NowPlayingDTO | None:
        async with httpx.AsyncClient() as client:
            response = await client.get(KEXP_NOW_PLAYING_URL)

        if response.status_code == 200:
            data = response.json()
            now_playing = data["results"][0]

            song = now_playing.get("song")
            artist = now_playing.get("artist")
            album = now_playing.get("album")
            play_time = now_playing.get("airdate")
            thumbnail = now_playing.get("image_uri")

            if play_time:
                play_time = pendulum.parse(play_time)
                play_time = play_time.strftime("%-I:%M %p")

            return NowPlayingDTO(
                song_name=song,
                artist_name=artist,
                album_name=album,
                play_time=play_time,
                thumbnail_url=thumbnail,
            )
        else:
            log.info(f"Failed to fetch now playing data: HTTP {response.status_code}")
            return None
