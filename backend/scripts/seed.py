import asyncio
import structlog
from sqlalchemy import select
from sqlalchemy.ext.asyncio import async_sessionmaker
from app.core.db import engine
from app.radio_stations.models.radio_station import RadioStationModel
from app.radio_stations.enums.radio_station_name import RadioStationName
from app.core.config import settings
from .wait_db import wait_db

log = structlog.get_logger()

seed_radio_stations: list[RadioStationModel] = [
    RadioStationModel(
        name=RadioStationName.KXCI.value,
        display_name="KXCI",
        stream_url="https://kxci.broadcasttool.stream/play",
        description="KXCI is a community radio station in Tucson, Arizona.",
        image_url=f"{settings.API_BASE_URL}/static/station-logos/kxci.png",
        playlist_url="https://spinitron.com/KXCI/",
    ),
    RadioStationModel(
        name=RadioStationName.KEXP.value,
        display_name="KEXP",
        stream_url="https://kexp-mp3-128.streamguys1.com/kexp128.mp3",
        description="KEXP is a non-commercial radio station licensed to Seattle, Washington.",
        image_url=f"{settings.API_BASE_URL}/static/station-logos/kexp.png",
        playlist_url="https://www.kexp.org/playlist/",
    ),
    RadioStationModel(
        name=RadioStationName.KXLU.value,
        display_name="KXLU",
        stream_url="https://kxlu.streamguys1.com/kxlu-hi",
        description="KXLU is a radio station broadcasting out of Loyola Marymount University in Los Angeles.",
        image_url=f"{settings.API_BASE_URL}/static/station-logos/kxlu.png",
        playlist_url="https://spinitron.com/KXLU/",
    ),
]

async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


async def seed() -> None:
    log.info("running seed")
    async with async_session_maker() as session:
        # upsert radio stations from seed into DB
        for seed_radio_station in seed_radio_stations:
            stmt = select(RadioStationModel).filter_by(name=seed_radio_station.name)
            result = await session.scalars(stmt)
            existing_seed_station = result.first()
            if existing_seed_station and existing_seed_station == seed_radio_station:
                log.info(f"{seed_radio_station.name} up to date, skipping")
                continue

            log.info(f"inserting / updating {seed_radio_station.name}")
            await session.merge(seed_radio_station)

        # remove radio stations from DB if they're not in seed (meaning stations that
        # have been removed from the seed for some reason)
        remove_stmt = select(RadioStationModel).where(
            RadioStationModel.name.not_in(
                [station.name for station in seed_radio_stations]
            )
        )
        result = await session.scalars(remove_stmt)
        stations_to_remove = result.all()
        for station in stations_to_remove:
            log.info(f"removing {station.name} from DB")
            await session.delete(station)

        await session.commit()
    log.info("seed complete")


async def entrypoint() -> None:
    await wait_db()
    await seed()


def main():
    asyncio.run(entrypoint())


if __name__ == "__main__":
    main()
