from sqlalchemy.sql import select
from app.core.db import engine
from sqlalchemy.orm import Session
from app.models.radio_station import RadioStationModel
from app.core.config import settings
from app.enums.radio_station_playlist_type import RadioStationPlaylistType
from .wait_db import wait_db

import structlog

log = structlog.get_logger()

seed_radio_stations: list[RadioStationModel] = [
    RadioStationModel(
        name="kxci",
        display_name="KXCI",
        stream_url="https://ais-sa1.streamon.fm/7005_64k.mp3",
        description="KXCI is a community radio station in Tucson, Arizona.",
        image_url=f"{settings.API_BASE_URL}/static/station-logos/kxci.png",
        playlist_type=RadioStationPlaylistType.SPINITRON,
        playlist_url="https://spinitron.com/KXCI/",
    ),
    RadioStationModel(
        name="kexp",
        display_name="KEXP",
        stream_url="https://kexp-mp3-128.streamguys1.com/kexp128.mp3",
        description="KEXP is a non-commercial radio station licensed to Seattle, Washington.",
        image_url=f"{settings.API_BASE_URL}/static/station-logos/kexp.png",
        playlist_type=None,
        playlist_url=None,
    ),
    RadioStationModel(
        name="kxlu",
        display_name="KXLU",
        stream_url="http://kxlu.streamguys1.com/kxlu-hi",
        description="KXLU is a radio station broadcasting out of Loyola Marymount University in Los Angeles.",
        image_url=f"{settings.API_BASE_URL}/static/station-logos/kxlu.png",
        playlist_type=RadioStationPlaylistType.SPINITRON,
        playlist_url="https://spinitron.com/KXLU/",
    ),
]


def seed():
    log.info("running seed")
    with Session(engine) as session:
        for seed_radio_station in seed_radio_stations:
            find_station_statement = select(RadioStationModel).filter_by(
                name=seed_radio_station.name
            )

            existing_seed_station = session.scalars(find_station_statement).first()

            if existing_seed_station and existing_seed_station == seed_radio_station:
                log.info(f"{seed_radio_station.name} up to date, skipping")
                continue

            log.info(f"inserting / updating {seed_radio_station.name}")
            session.merge(seed_radio_station)

        session.commit()
    log.info("seed complete")


def main():
    wait_db()
    seed()


if __name__ == "__main__":
    main()
