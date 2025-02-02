from app.radio_stations.dtos.radio_station import RadioStationDTO
from app.radio_stations.now_playing.now_playing_mapper import get_now_playing_from_model
import structlog
from app.core.dependencies import (
    CacheDep,
    SessionDep,
)
from app.radio_stations.dtos.now_playing import NowPlayingDTO
from fastapi import APIRouter, HTTPException
from app.radio_stations.models.radio_station import RadioStationModel
from sqlalchemy import select

log = structlog.get_logger()

router = APIRouter(
    prefix="/radio-stations",
    tags=["radio-stations"],
)


@router.get("")
async def read_all_radio_stations(session: SessionDep) -> list[RadioStationDTO]:
    """
    Read all radio stations.
    """
    stmt = select(RadioStationModel)
    result = await session.scalars(stmt)
    radio_station_models = result.all()

    if not radio_station_models:
        raise HTTPException(status_code=500, detail="Failed to retrieve radio stations")

    return [
        RadioStationDTO.from_orm(radio_station_model)
        for radio_station_model in radio_station_models
    ]


@router.get("/{name}")
async def read_radio_station(session: SessionDep, name: str) -> RadioStationDTO:
    """
    Read a single radio station by name.
    """
    stmt = select(RadioStationModel).filter_by(name=name)
    result = await session.scalars(stmt)
    radio_station_model = result.first()

    if radio_station_model is None:
        raise HTTPException(status_code=404, detail=f"Station {name} was not found")

    return RadioStationDTO.from_orm(radio_station_model)


@router.get("/{name}/now-playing")
async def read_radio_station_now_playing(
    session: SessionDep, cache: CacheDep, name: str
) -> NowPlayingDTO | None:
    """
    Read now playing information for a radio station by name.
    """
    cache_key = f"${name}-now-playing"
    now_playing_cache = await cache.get(cache_key)
    if now_playing_cache:
        return NowPlayingDTO(**now_playing_cache)

    stmt = select(RadioStationModel).filter_by(name=name)
    result = await session.scalars(stmt)
    radio_station_model = result.first()

    if radio_station_model is None:
        raise HTTPException(status_code=404, detail=f"Station {name} was not found")

    now_playing_grabber = get_now_playing_from_model(radio_station_model)
    now_playing_dto = await now_playing_grabber.get_now_playing()

    if now_playing_dto:
        await cache.set(cache_key, now_playing_dto.model_dump(), ttl=10)

    return now_playing_dto
