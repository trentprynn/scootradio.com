import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoriteStationsState {
    favoriteStationNames: string[]
    addFavoriteStation: (stationName: string) => void
    removeFavoriteStation: (stationName: string) => void
}

export const useFavoriteStationsState = create(
    persist<FavoriteStationsState>(
        (set) => ({
            favoriteStationNames: [],
            addFavoriteStation: (stationName) => {
                set((state) => {
                    if (state.favoriteStationNames.includes(stationName)) {
                        return state
                    }

                    return {
                        favoriteStationNames: [...state.favoriteStationNames, stationName],
                    }
                })
            },
            removeFavoriteStation: (stationName) => {
                set((state) => {
                    return {
                        favoriteStationNames: state.favoriteStationNames.filter((name) => name !== stationName),
                    }
                })
            },
        }),
        {
            name: 'favorite-stations',
        }
    )
)
