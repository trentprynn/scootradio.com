from sqlalchemy.sql import select
from app.core.db import engine
from sqlalchemy.orm import Session
from app.models.radio_station import RadioStationModel

seed_radio_stations: list[RadioStationModel] = [
    RadioStationModel(
        name="kxci",
        display_name="KXCI",
        stream_url="https://ais-sa1.streamon.fm/7005_64k.mp3",
        description="KXCI is a community radio station in Tucson, Arizona.",
        image_url="https://s3.amazonaws.com/streaming-player-assets/KXCI/custom/images/kxci-logo-20170816165540.png",
    ),
    RadioStationModel(
        name="kexp",
        display_name="KEXP",
        stream_url="https://kexp-mp3-128.streamguys1.com/kexp128.mp3",
        description="KEXP is a non-commercial radio station licensed to Seattle, Washington, United States, specializing in alternative and indie rock.",
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/KEXP_logo_%28black_on_orange%29.svg/250px-KEXP_logo_%28black_on_orange%29.svg.png",
    ),
]


def seed():
    with Session(engine) as session:
        for seed_radio_station in seed_radio_stations:
            find_seed_statement = select(RadioStationModel).filter_by(
                name=seed_radio_station.name
            )

            existing_seed_station = session.scalars(find_seed_statement).first()

            if existing_seed_station:
                print(
                    f"Radio Station {seed_radio_station.name} already exists, skipping insertion."
                )
                continue

            print(f"Inserting {seed_radio_station.name}")
            session.add(seed_radio_station)

        session.commit()


def main():
    seed()


if __name__ == "__main__":
    main()
