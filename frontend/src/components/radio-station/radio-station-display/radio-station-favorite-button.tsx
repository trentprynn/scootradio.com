'use client'

import { useFavoriteStationsState } from '@/global-state/favorite-stations-state'
import { FaRegStar, FaStar } from 'react-icons/fa6'

type RadioStationFavoriteButtonProps = {
    radioStationName: string
    size?: 'sm' | 'md'
}

export function RadioStationFavoriteButton({ radioStationName, size = 'md' }: RadioStationFavoriteButtonProps) {
    const { favoriteStationNames, addFavoriteStation, removeFavoriteStation } = useFavoriteStationsState()

    const isFavorite = favoriteStationNames.includes(radioStationName)
    const iconSize = size === 'sm' ? 16 : 24
    const sizeClassName = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'

    if (isFavorite) {
        return (
            <button
                onClick={() => removeFavoriteStation(radioStationName)}
                className={`inline-flex ${sizeClassName} cursor-pointer items-center justify-center rounded-full text-yellow-500 transition-colors hover:bg-yellow-400/15 hover:text-yellow-400 focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:outline-none dark:text-yellow-400 dark:hover:bg-yellow-300/15`}
                title="Remove from favorites"
                aria-label="Remove from favorites"
            >
                <FaStar size={iconSize} />
            </button>
        )
    }

    return (
        <button
            onClick={() => addFavoriteStation(radioStationName)}
            className={`inline-flex ${sizeClassName} cursor-pointer items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-yellow-400/15 hover:text-yellow-400 focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:outline-none dark:text-gray-300 dark:hover:bg-yellow-300/15 dark:hover:text-yellow-300`}
            title="Add to favorites"
            aria-label="Add to favorites"
        >
            <FaRegStar size={iconSize} />
        </button>
    )
}
