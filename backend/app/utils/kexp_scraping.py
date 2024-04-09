import structlog
from app.core.constants import KEXP_NOW_PLAYING_URL
from app.dtos.now_playing import NowPlayingDTO
import requests
import pendulum


log = structlog.get_logger()


def get_now_playing_via_kexp() -> NowPlayingDTO | None:
    response = requests.get(KEXP_NOW_PLAYING_URL)
    if response.status_code == 200:
        data = response.json()
        now_playing = data["results"][0]

        song = None
        artist = None
        album = None
        play_time = None
        thumbnail = None

        if "song" in now_playing:
            song = now_playing["song"]

        if "artist" in now_playing:
            artist = now_playing["artist"]

        if "album" in now_playing:
            album = now_playing["album"]

        if "airdate" in now_playing:
            # ex: 2024-04-09T03:37:32-07:00
            play_time = now_playing["airdate"]
            play_time = pendulum.parse(play_time)
            play_time = play_time.strftime("%-I:%M %p")

        if "image_uri" in now_playing:
            thumbnail = now_playing["image_uri"]

        return NowPlayingDTO(
            song_name=song,
            artist_name=artist,
            album_name=album,
            play_time=play_time,
            thumbnail_url=thumbnail,
        )
    else:
        return None
