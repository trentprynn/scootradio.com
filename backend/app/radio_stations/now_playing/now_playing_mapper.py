from app.radio_stations.enums.radio_station_name import RadioStationName
from app.radio_stations.models.radio_station import RadioStationModel
from app.radio_stations.now_playing.kexp_now_playing import KEXPNowPlaying
from app.radio_stations.now_playing.now_playing_base import BaseNowPlaying
from app.radio_stations.now_playing.spinitron_now_playing import SpinitronNowPlaying


def get_now_playing_from_model(model: RadioStationModel) -> BaseNowPlaying:
    match model.name:
        case RadioStationName.KXCI.value:
            if model.playlist_url:
                return SpinitronNowPlaying(model.playlist_url)
        case RadioStationName.KXLU.value:
            if model.playlist_url:
                return SpinitronNowPlaying(model.playlist_url)
        case RadioStationName.KEXP.value:
            return KEXPNowPlaying()

    raise ValueError(
        f"Invalid radio station model given for now playing mapping {model}"
    )
