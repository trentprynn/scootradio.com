'use client'

import { useAllRadioStations } from '@/api/radio-stations/react-queries/use-all-radio-stations'
import { FullPageErrorIndicator } from '@/components/core/error-handling/full-page-error-indicator'
import { StandardPageWrapper } from '@/components/core/layout/standard-page-wrapper'
import { FullPageLoadingIndicator } from '@/components/core/loading-indication/full-page-loading-indicator'
import { StationDisplay } from '@/components/radio-station/station-display/station-display'
import { useFavoriteStationsState } from '@/global-state/favorite-stations-state'
import { getErrorMessage } from '@/utils/functions/error-handling-utils'
import { Box } from '@chakra-ui/react'
import FlipMove from 'react-flip-move'

export default function Home() {
    const {
        data: radioStations,
        error: radioStationsFetchError,
        isLoading: radioStationsLoading,
    } = useAllRadioStations()

    const { favoriteStationNames } = useFavoriteStationsState()

    if (radioStationsLoading) {
        return <FullPageLoadingIndicator />
    }

    if (!radioStations) {
        return (
            <FullPageErrorIndicator
                title="Failed to load radio stations"
                description={getErrorMessage(radioStationsFetchError)}
            />
        )
    }

    const sortedRadioStations = [...radioStations].sort((a, b) => {
        const aIsFavorite = favoriteStationNames.includes(a.name)
        const bIsFavorite = favoriteStationNames.includes(b.name)

        if (aIsFavorite && !bIsFavorite) {
            return -1
        }
        if (!aIsFavorite && bIsFavorite) {
            return 1
        }
        return 0
    })

    return (
        <StandardPageWrapper>
            <FlipMove>
                {sortedRadioStations.map((radioStation) => (
                    <Box key={radioStation.name} mb={4}>
                        <StationDisplay radioStation={radioStation} />
                    </Box>
                ))}
            </FlipMove>
        </StandardPageWrapper>
    )
}
