from abc import ABC, abstractmethod
from app.radio_stations.dtos.now_playing import NowPlayingDTO


class BaseNowPlaying(ABC):
    @abstractmethod
    async def get_now_playing(self) -> NowPlayingDTO | None:
        pass
