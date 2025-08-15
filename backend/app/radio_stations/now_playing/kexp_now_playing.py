import pendulum
import structlog
import httpx
from pendulum import Date, Time, DateTime, Duration  # <-- import types
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
            play_time_raw = now_playing.get("airdate")
            thumbnail = now_playing.get("image_uri")

            play_time: str | None = None
            if play_time_raw:
                parsed = pendulum.parse(play_time_raw)
                if isinstance(parsed, (DateTime, Date, Time)):
                    play_time = parsed.strftime("%-I:%M %p")
                elif isinstance(parsed, Duration):
                    # failed to parse play time
                    play_time = None

            return NowPlayingDTO(
                song_name=song,
                artist_name=artist,
                album_name=album,
                play_time=play_time,
                thumbnail_url=thumbnail,
            )

        log.info(f"Failed to fetch now playing data: HTTP {response.status_code}")
        return None
