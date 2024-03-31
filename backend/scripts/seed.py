import logging
from sqlalchemy.sql import select
from app.core.db import engine
from sqlalchemy.orm import Session
from app.models.radio_station import RadioStationModel
from app.core.config import settings
from .prestart import prestart

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

seed_radio_stations: list[RadioStationModel] = [
    RadioStationModel(
        name="kxci",
        display_name="KXCI",
        stream_url="https://ais-sa1.streamon.fm/7005_64k.mp3",
        description="KXCI is a community radio station in Tucson, Arizona.",
        image_url=f"{settings.API_BASE_URL}/static/station-logos/kxci.png",
    ),
    RadioStationModel(
        name="kexp",
        display_name="KEXP",
        stream_url="https://kexp-mp3-128.streamguys1.com/kexp128.mp3",
        description="KEXP is a non-commercial radio station licensed to Seattle, Washington.",
        image_url=f"{settings.API_BASE_URL}/static/station-logos/kexp.png",
    ),
    RadioStationModel(
        name="kxlu",
        display_name="KXLU",
        stream_url="http://kxlu.streamguys1.com/kxlu-hi",
        description="KXLU is a radio station broadcasting out of Loyola Marymount University in Los Angeles.",
        image_url=f"{settings.API_BASE_URL}/static/station-logos/kxlu.png",
    ),
]


def seed():
    prestart()
    logger.info("seeding...")
    with Session(engine) as session:
        for seed_radio_station in seed_radio_stations:
            find_seed_statement = select(RadioStationModel).filter_by(
                name=seed_radio_station.name
            )

            existing_seed_station = session.scalars(find_seed_statement).first()

            if existing_seed_station and existing_seed_station == seed_radio_station:
                logger.info(f"{seed_radio_station.name} up to date, skipping")
                continue

            logger.info(f"inserting / updating {seed_radio_station.name}")
            session.merge(seed_radio_station)

        session.commit()


def main():
    seed()


if __name__ == "__main__":
    main()
