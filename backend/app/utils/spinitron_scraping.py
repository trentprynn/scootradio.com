import structlog
from app.dtos.now_playing import NowPlayingDTO
from bs4 import BeautifulSoup, Tag
import requests

log = structlog.get_logger()


def get_now_playing_via_spinitron(station_url: str) -> NowPlayingDTO | None:
    log.info(f"Fetching now playing spinitron data for {station_url}")
    response = requests.get(station_url)

    if response.status_code != 200:
        log.info(f"Response status code from {station_url}: {response.status_code}")
        return None

    soup = BeautifulSoup(response.text, "html.parser")

    artist = None
    song = None
    album = None
    play_time = None
    thumbnail = None

    artist_tag = soup.find("span", class_="artist")
    if isinstance(artist_tag, Tag):
        artist = artist_tag.text

    song_tag = soup.find("span", class_="song")
    if isinstance(song_tag, Tag):
        song = song_tag.text

    album_tag = soup.find("span", class_="release")
    if isinstance(album_tag, Tag):
        album = album_tag.text

    play_time_tag = soup.find("td", class_="spin-time")
    if isinstance(play_time_tag, Tag) and play_time_tag.a:
        play_time = play_time_tag.a.text

    thumbnail_tag = soup.find("div", class_="spin-art-container")
    if isinstance(thumbnail_tag, Tag) and thumbnail_tag.img:
        thumbnail_src = thumbnail_tag.img.get("src")  # Use .get to safely access 'src'
        if isinstance(thumbnail_src, str):
            thumbnail = thumbnail_src  # Only assign if it's a string

    return NowPlayingDTO(
        song_name=song,
        album_name=album,
        artist_name=artist,
        play_time=play_time,
        thumbnail_url=thumbnail,
    )
