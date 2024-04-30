'use client'

import { useAllRadioStations } from '@/api/radio-stations/react-queries/use-all-radio-stations'
import { FullPageErrorIndicator } from '@/components/core/error-handling/full-page-error-indicator'
import { StandardPageWrapper } from '@/components/core/layout/standard-page-wrapper'
import { FullPageLoadingIndicator } from '@/components/core/loading-indication/full-page-loading-indicator'
import { StationDisplay } from '@/components/radio-station/station-display/station-display'
import { useFavoriteStationsState } from '@/global-state/favorite-stations-state'
import { getErrorMessage } from '@/utils/functions/error-handling-utils'
import { Box, Input, Text } from '@chakra-ui/react'
import { useFormik } from 'formik'
import lodash from 'lodash'
import { useMemo } from 'react'
import { Flipped, Flipper } from 'react-flip-toolkit'

export default function Home() {
    const {
        data: radioStations,
        error: radioStationsFetchError,
        isLoading: radioStationsLoading,
    } = useAllRadioStations()

    const { favoriteStationNames } = useFavoriteStationsState()

    const formik = useFormik({
        initialValues: {
            search: '',
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
        },
        validateOnChange: true,
    })

    const filteredAndSortedStations = useMemo(() => {
        if (!radioStations) {
            return []
        }

        let stations = lodash.cloneDeep(radioStations)

        stations.sort((a, b) => {
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

        if (formik.values.search) {
            let cleanSearchValue = formik.values.search.trim().toLowerCase()
            stations = stations.filter((s) => {
                return (
                    s.display_name.toLowerCase().includes(cleanSearchValue) ||
                    s.name.toLowerCase().includes(cleanSearchValue)
                )
            })
        }

        return stations
    }, [radioStations, favoriteStationNames, formik.values.search])

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

    return (
        <StandardPageWrapper>
            <Box mb={4}>
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        id="search"
                        name="search"
                        type="search"
                        placeholder="search..."
                        _placeholder={{ opacity: 1, color: 'gray.500' }}
                        onChange={formik.handleChange}
                        value={formik.values.search}
                    />
                </form>
            </Box>

            <Flipper flipKey={filteredAndSortedStations.map((s) => s.name).join('')}>
                {filteredAndSortedStations.map((radioStation) => (
                    <Flipped key={radioStation.name} flipId={radioStation.name}>
                        <Box mb={4}>
                            <StationDisplay radioStation={radioStation} />
                        </Box>
                    </Flipped>
                ))}
            </Flipper>

            {filteredAndSortedStations.length === 0 && (
                <Box>
                    <Text align={'center'}>No stations found...</Text>
                </Box>
            )}
        </StandardPageWrapper>
    )
}
