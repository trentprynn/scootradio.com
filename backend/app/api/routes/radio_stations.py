from app.api.dependencies import SessionDep, get_session
from fastapi import APIRouter, Depends, HTTPException
from app.models.radio_station import RadioStationModel
from app.dtos.radio_station import RadioStationDTO
from sqlalchemy import select

router = APIRouter(
    prefix="/radio-stations",
    tags=["radio-stations"],
    dependencies=[Depends(get_session)],
)


@router.get("")
def read_all_radio_stations(session: SessionDep) -> list[RadioStationDTO]:
    """
    Get radio station by name.
    """

    find_stations_statement = select(RadioStationModel)

    radio_station_models = session.scalars(find_stations_statement).all()

    if radio_station_models is None:
        raise HTTPException(status_code=500, detail="Failed to retrieve radio stations")

    return [
        RadioStationDTO.from_orm(radio_station_model)
        for radio_station_model in radio_station_models
    ]


@router.get("/{name}", response_model=RadioStationDTO)
def read_radio_station(session: SessionDep, name: str) -> RadioStationDTO:
    """
    Get radio station by name.
    """

    find_station_statement = select(RadioStationModel).filter_by(name=name)

    radio_station_model = session.scalars(find_station_statement).first()

    if radio_station_model is None:
        raise HTTPException(status_code=404, detail=f"Station {name} was not found")

    return RadioStationDTO.from_orm(radio_station_model)
