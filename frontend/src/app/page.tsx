'use client'

import { useAllRadioStations } from '@/api/radio-stations/hooks/use-all-radio-stations'
import { FullPageErrorIndicator } from '@/components/core/error-handling/full-page-error-indicator'
import { StandardPageWrapper } from '@/components/core/layout/standard-page-wrapper'
import { FullPageLoadingIndicator } from '@/components/core/loading/full-page-loading-indicator'
import { StationDisplay } from '@/components/radio-station/station-display/station-display'
import { useFavoriteStationsState } from '@/global-state/favorite-stations-state'
import { getErrorMessage } from '@/utils/functions/error-handling-utils'
import { Input } from '@headlessui/react'
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
        onSubmit: () => {
            // NO-OP
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
            const cleanSearchValue = formik.values.search.trim().toLowerCase()
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
            <div className="mt-4 flex flex-row justify-center">
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        id="search"
                        name="search"
                        type="search"
                        placeholder="Search..."
                        autoComplete="off"
                        className="block w-60 rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-hidden focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        onChange={formik.handleChange}
                        value={formik.values.search}
                    />
                </form>
            </div>

            {filteredAndSortedStations.length === 0 && (
                <div className="mt-5 text-center text-sm text-gray-600 dark:text-gray-300">
                    <p>No stations found...</p>
                </div>
            )}

            <div className="flex-column mb-16 mt-5 flex justify-center gap-y-1 p-4">
                <Flipper flipKey={filteredAndSortedStations.map((s) => s.name).join('')}>
                    {filteredAndSortedStations.map((radioStation) => (
                        <Flipped key={radioStation.name} flipId={radioStation.name}>
                            <div className="mt-4">
                                <StationDisplay radioStation={radioStation} />
                            </div>
                        </Flipped>
                    ))}
                </Flipper>
            </div>
        </StandardPageWrapper>
    )
}
