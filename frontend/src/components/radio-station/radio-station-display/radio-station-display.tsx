'use client'

import { RadioStation } from '@/api/radio-stations/types/radio-station.type'
import { AnimatedWave } from '@/components/animations/animated-wave'
import { useFavoriteStationsState } from '@/global-state/favorite-stations-state'
import { useRadioPlayerState } from '@/global-state/radio-player-state'
import { FaRegStar, FaStar } from 'react-icons/fa6'

type RadioStationDisplayProps = {
    radioStation: RadioStation
}

export function RadioStationDisplay({ radioStation }: RadioStationDisplayProps) {
    const { currentStation, playStation } = useRadioPlayerState()

    const { favoriteStationNames, addFavoriteStation, removeFavoriteStation } = useFavoriteStationsState()

    const isFavorite = favoriteStationNames.includes(radioStation.name)
    const isCurrentStationPlaying = currentStation?.name === radioStation.name

    return (
        <div className="max-w-md rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        className="mr-3 h-12 w-12 rounded-full"
                        src={radioStation.image_url}
                        alt={radioStation.display_name}
                    />
                    <div>
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                            {radioStation.display_name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{radioStation.description}</p>
                    </div>
                </div>
                <div>
                    {isFavorite ? (
                        <button onClick={() => removeFavoriteStation(radioStation.name)} title="Remove favorite">
                            <FaStar />
                        </button>
                    ) : (
                        <button onClick={() => addFavoriteStation(radioStation.name)} title="Add favorite">
                            <FaRegStar />
                        </button>
                    )}
                </div>
            </div>
            <div className="mt-2 flex items-center">
                {isCurrentStationPlaying ? (
                    <AnimatedWave />
                ) : (
                    <button
                        onClick={() => {
                            playStation(radioStation)
                        }}
                        className="w-[80px] rounded-sm bg-blue-500 px-3 py-1 text-sm font-semibold text-white hover:bg-blue-600 focus:outline-hidden dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        Play
                    </button>
                )}
            </div>
        </div>
    )
}
