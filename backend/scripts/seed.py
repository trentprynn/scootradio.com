import asyncio
from datetime import UTC, datetime

import structlog
from sqlalchemy import select
from sqlalchemy.ext.asyncio import async_sessionmaker
from app.core.db import engine
from app.radio_stations.models.radio_station import RadioStationModel
from app.radio_stations.enums.radio_station_name import RadioStationName
from app.core.config import settings
from .wait_db import wait_db

log = structlog.get_logger()

station_content_updated_at = datetime(2026, 5, 10, tzinfo=UTC)

seed_radio_stations: list[RadioStationModel] = [
    RadioStationModel(
        name=RadioStationName.KXCI.value,
        display_name="KXCI",
        stream_url="https://kxci.broadcasttool.stream/play",
        description="KXCI is a community radio station in Tucson, Arizona.",
        long_description="KXCI is Tucson's community radio station, serving Tucson and Southern Arizona with independent music, local voices, and community-based programming.",
        image_url=f"{settings.API_BASE_URL}/static/station-logos/kxci.png",
        call_sign="KXCI",
        frequency="91.3 FM",
        city="Tucson",
        region="Arizona",
        country="United States",
        website_url="https://kxci.org/",
        format="Community radio",
        tagline="Real People, Real Radio",
        seo_title="Listen to KXCI 91.3 FM Tucson Online",
        seo_description="Stream KXCI 91.3 FM, Tucson's community radio station, online for free on ScootRadio.",
        content_updated_at=station_content_updated_at,
        playlist_url="https://spinitron.com/KXCI/",
    ),
    RadioStationModel(
        name=RadioStationName.KEXP.value,
        display_name="KEXP",
        stream_url="https://kexp-mp3-128.streamguys1.com/kexp128.mp3",
        description="KEXP is a non-commercial radio station licensed to Seattle, Washington.",
        long_description="KEXP is a Seattle-based non-commercial music station focused on music discovery, independent artists, and listener-supported radio.",
        image_url=f"{settings.API_BASE_URL}/static/station-logos/kexp.png",
        call_sign="KEXP",
        frequency="90.3 FM",
        city="Seattle",
        region="Washington",
        country="United States",
        website_url="https://www.kexp.org/",
        format="Independent music",
        tagline="Music discovery from Seattle and around the world",
        seo_title="Listen to KEXP 90.3 FM Seattle Online",
        seo_description="Stream KEXP 90.3 FM, Seattle's independent music station, online for free on ScootRadio.",
        content_updated_at=station_content_updated_at,
        playlist_url="https://www.kexp.org/playlist/",
    ),
    RadioStationModel(
        name=RadioStationName.KXLU.value,
        display_name="KXLU",
        stream_url="https://kxlu.streamguys1.com/kxlu-hi",
        description="KXLU is a radio station broadcasting out of Loyola Marymount University in Los Angeles.",
        long_description="KXLU is a non-commercial, student and volunteer-powered radio station broadcasting from Loyola Marymount University in Los Angeles.",
        image_url=f"{settings.API_BASE_URL}/static/station-logos/kxlu.png",
        call_sign="KXLU",
        frequency="88.9 FM",
        city="Los Angeles",
        region="California",
        country="United States",
        website_url="https://kxlu.com/",
        format="Freeform college radio",
        tagline="Broadcasting from the blufftops of Loyola Marymount University since 1957",
        seo_title="Listen to KXLU 88.9 FM Los Angeles Online",
        seo_description="Stream KXLU 88.9 FM, Loyola Marymount University's freeform Los Angeles radio station, online for free on ScootRadio.",
        content_updated_at=station_content_updated_at,
        playlist_url="https://spinitron.com/KXLU/",
    ),
    RadioStationModel(
        name=RadioStationName.KUOM.value,
        display_name="Radio K",
        stream_url="https://radiok.broadcasttool.stream/play_256",
        description="Radio K (KUOM) is the student-run radio station of the University of Minnesota.",
        long_description="Radio K (KUOM) is the student-run radio station of the University of Minnesota, broadcasting college radio from Minneapolis.",
        image_url=f"{settings.API_BASE_URL}/static/station-logos/kuom.jpg",
        call_sign="KUOM",
        frequency="770 AM, 100.7 FM, 104.5 FM, 106.5 FM",
        city="Minneapolis",
        region="Minnesota",
        country="United States",
        website_url="https://radiok.org/",
        format="College radio",
        tagline="Real College Radio",
        seo_title="Listen to Radio K KUOM Minneapolis Online",
        seo_description="Stream Radio K (KUOM), the University of Minnesota's student-run radio station, online for free on ScootRadio.",
        content_updated_at=station_content_updated_at,
        playlist_url="https://spinitron.com/KUOM/",
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
