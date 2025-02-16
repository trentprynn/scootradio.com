'use client'

import { RadioStation } from '@/api/radio-stations/types/radio-station.type'
import { AnimatedWave } from '@/components/animations/animated-wave'
import { useFavoriteStationsState } from '@/global-state/favorite-stations-state'
import { useRadioPlayerState } from '@/global-state/radio-player-state'
import { Button } from '@headlessui/react'
import { useMemo } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa6'

type LargeRadioStationDisplayProps = {
    radioStation: RadioStation
}

export function LargeRadioStationDisplay({ radioStation }: LargeRadioStationDisplayProps) {
    const { currentStation, playStation } = useRadioPlayerState()
    const { favoriteStationNames, addFavoriteStation, removeFavoriteStation } = useFavoriteStationsState()

    const isFavorite = favoriteStationNames.includes(radioStation.name)
    const isCurrentStationPlaying = currentStation?.name === radioStation.name

    const message = useMemo(() => {
        if (radioStation.description) {
            return `${radioStation.description} Listen online for free powered by ScootRadio.`
        }

        return `Listen to ${radioStation.display_name} online for free powered by ScootRadio.`
    }, [radioStation])

    return (
        <>
            <div className="mx-auto max-w-2xl overflow-hidden rounded-lg bg-slate-100 px-4 py-3 shadow-md md:max-w-3xl dark:bg-gray-800">
                <div>
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">
                            {radioStation.display_name}
                        </h1>

                        {isFavorite ? (
                            <button
                                onClick={() => removeFavoriteStation(radioStation.name)}
                                className="text-yellow-500 hover:opacity-80 dark:text-yellow-400"
                                title="Remove from favorites"
                            >
                                <FaStar size={24} />
                            </button>
                        ) : (
                            <button
                                onClick={() => addFavoriteStation(radioStation.name)}
                                className="text-gray-500 hover:text-yellow-400 dark:text-gray-200"
                                title="Add to favorites"
                            >
                                <FaRegStar size={24} />
                            </button>
                        )}
                    </div>

                    {message}
                </div>

                <div className="mt-4 w-full max-w-2xl">
                    <img
                        loading="lazy"
                        src={radioStation.image_url}
                        alt={radioStation.display_name}
                        className="mx-auto h-auto w-full rounded-md object-cover"
                    />
                </div>

                <div className="mt-4 flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
                    {isCurrentStationPlaying ? (
                        <AnimatedWave />
                    ) : (
                        <Button
                            onClick={() => playStation(radioStation)}
                            className="mt-2 cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 focus:outline-none sm:mt-0 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            Play
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}
