from sqlalchemy.sql import select
from app.core.db import engine
from sqlalchemy.orm import Session
from app.models.radio_station import RadioStationModel


def seed():
    kxci_radio_station_to_upsert = RadioStationModel(
        name="kxci",
        display_name="KXCI",
        stream_url="https://ais-sa1.streamon.fm/7005_64k.mp3",
        description="KXCI is a community radio station in Tucson, Arizona.",
        image_url="https://s3.amazonaws.com/streaming-player-assets/KXCI/custom/images/kxci-logo-20170816165540.png",
    )

    with Session(engine) as session:
        find_kxci_statement = select(RadioStationModel).filter_by(
            name=kxci_radio_station_to_upsert.name
        )

        existing_kxci_station = session.scalars(find_kxci_statement).first()

        if existing_kxci_station:
            print(
                f"Radio Station {kxci_radio_station_to_upsert.name} already exists, skipping insertion."
            )
            return

        print(f"Inserting {kxci_radio_station_to_upsert.name}")
        session.add(kxci_radio_station_to_upsert)
        session.commit()


def main():
    seed()


if __name__ == "__main__":
    main()
