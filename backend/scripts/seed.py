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
        description="KEXP is a non-commercial radio station licensed to Seattle, Washington.",
        image_url="https://4.bp.blogspot.com/-oCZc4ZfDod4/WfTOSdh9dKI/AAAAAAAAXEw/QNHfn2BxxbwzuVrmL4s3Wnpn_VftB_9tACLcBGAs/s1600/kexp5.jpg",
    ),
    RadioStationModel(
        name="kxlu",
        display_name="KXLU",
        stream_url="http://kxlu.streamguys1.com/kxlu-hi",
        description="KXLU is a radio station broadcasting out of Loyola Marymount University in Los Angeles, California.",
        image_url="https://i0.wp.com/indiepulsemusic.com/wp-content/uploads/2018/03/kxlu-logo-revised.png?fit=424%2C160&ssl=1",
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
