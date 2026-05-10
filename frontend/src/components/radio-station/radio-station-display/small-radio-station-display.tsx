'use client'

import { RadioStation } from '@/api/radio-stations/types/radio-station.type'
import { RadioStationPlayButton } from '@/components/radio-station/radio-station-display/radio-station-play-button'
import { useFavoriteStationsState } from '@/global-state/favorite-stations-state'
import { useRadioPlayerState } from '@/global-state/radio-player-state'
import Link from 'next/link'
import { FaRegStar, FaStar } from 'react-icons/fa6'

type SmallRadioStationDisplayProps = {
    radioStation: RadioStation
}

export function SmallRadioStationDisplay({ radioStation }: SmallRadioStationDisplayProps) {
    const { currentStation, playStation } = useRadioPlayerState()

    const { favoriteStationNames, addFavoriteStation, removeFavoriteStation } = useFavoriteStationsState()

    const isFavorite = favoriteStationNames.includes(radioStation.name)
    const isCurrentStationPlaying = currentStation?.name === radioStation.name

    return (
        <div className="max-w-md rounded-lg bg-slate-100 p-4 shadow-md dark:bg-gray-800">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        className="mr-3 h-12 w-12 rounded-full"
                        src={radioStation.image_url}
                        alt={radioStation.display_name}
                    />
                    <div>
                        <div className="flex items-center justify-between">
                            <Link href={`/stations/${radioStation.name}`}>
                                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    {radioStation.display_name}
                                </p>
                            </Link>
                            {isFavorite ? (
                                <button
                                    onClick={() => removeFavoriteStation(radioStation.name)}
                                    title="Remove favorite"
                                >
                                    <FaStar />
                                </button>
                            ) : (
                                <button onClick={() => addFavoriteStation(radioStation.name)} title="Add favorite">
                                    <FaRegStar />
                                </button>
                            )}
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400">{radioStation.description}</p>
                    </div>
                </div>
                <div></div>
            </div>
            <div className="mt-2 flex items-center">
                <RadioStationPlayButton
                    isPlaying={isCurrentStationPlaying}
                    onPlay={() => playStation(radioStation)}
                    label="Play"
                />
            </div>
        </div>
    )
}
