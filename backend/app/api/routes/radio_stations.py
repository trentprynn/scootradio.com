from app.utils.kexp_scraping import get_now_playing_via_kexp
from app.utils.spinitron_scraping import get_now_playing_via_spinitron
import structlog
from app.api.dependencies import CacheDep, SessionDep, get_session
from app.dtos.now_playing import NowPlayingDTO
from app.enums.radio_station_playlist_type import RadioStationPlaylistType
from fastapi import APIRouter, Depends, HTTPException
from app.models.radio_station import RadioStationModel
from app.dtos.radio_station import RadioStationDTO
from sqlalchemy import select

log = structlog.get_logger()

router = APIRouter(
    prefix="/radio-stations",
    tags=["radio-stations"],
    dependencies=[Depends(get_session)],
)


@router.get("")
def read_all_radio_stations(session: SessionDep) -> list[RadioStationDTO]:
    """
    Read all radio stations.
    """

    find_stations_statement = select(RadioStationModel)

    radio_station_models = session.scalars(find_stations_statement).all()

    if radio_station_models is None:
        raise HTTPException(status_code=500, detail="Failed to retrieve radio stations")

    return [
        RadioStationDTO.from_orm(radio_station_model)
        for radio_station_model in radio_station_models
    ]


@router.get("/{name}")
def read_radio_station(session: SessionDep, name: str) -> RadioStationDTO:
    """
    Read a single radio station by name.
    """

    find_station_statement = select(RadioStationModel).filter_by(name=name)

    radio_station_model = session.scalars(find_station_statement).first()

    if radio_station_model is None:
        raise HTTPException(status_code=404, detail=f"Station {name} was not found")

    return RadioStationDTO.from_orm(radio_station_model)


@router.get("/{name}/now-playing")
async def read_radio_station_now_playing(
    session: SessionDep, cache: CacheDep, name: str
) -> NowPlayingDTO | None:
    now_playing_cache = await cache.get(f"${name}-now-playing")
    if now_playing_cache:
        now_playing_cache_dto = NowPlayingDTO(**now_playing_cache)
        return now_playing_cache_dto

    find_station_statement = select(RadioStationModel).filter_by(name=name)

    radio_station_model = session.scalars(find_station_statement).first()

    if radio_station_model is None:
        raise HTTPException(status_code=404, detail=f"Station {name} was not found")

    if radio_station_model.playlist_type is None:
        return None

    now_playing: NowPlayingDTO | None = None

    if radio_station_model.playlist_type == RadioStationPlaylistType.SPINITRON:
        if radio_station_model.playlist_url is None:
            return None
        now_playing = get_now_playing_via_spinitron(radio_station_model.playlist_url)
    elif radio_station_model.playlist_type == RadioStationPlaylistType.KEXP:
        now_playing = get_now_playing_via_kexp()
    else:
        pass

    if now_playing is None:
        return None

    await cache.set(f"${name}-now-playing", now_playing.model_dump(), ttl=1)
    return now_playing
