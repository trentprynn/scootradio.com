'use client'

import { useRadioStation } from '@/api/radio-stations/react-queries/use-radio-station'
import { FullPageErrorIndicator } from '@/components/core/error-handling/full-page-error-indicator'
import { StandardPageWrapper } from '@/components/core/layout/standard-page-wrapper'
import { FullPageLoadingIndicator } from '@/components/core/loading-indication/full-page-loading-indicator'
import { StationDisplay } from '@/components/radio-station/station-display/station-display'
import { PAGE_URLS } from '@/constants/page-urls'
import { getErrorMessage } from '@/utils/functions/error-handling-utils'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import NextLink from 'next/link'

type RadioStationPageProps = {
    params: {
        name: string
    }
}

export default function RadioStationPage(props: RadioStationPageProps) {
    const {
        data: radioStation,
        error: radioStationFetchError,
        isLoading: radioStationLoading,
    } = useRadioStation(props.params.name)

    if (radioStationLoading) {
        return <FullPageLoadingIndicator />
    }

    if (!radioStation) {
        return (
            <FullPageErrorIndicator
                title="Failed to load radio station"
                description={getErrorMessage(radioStationFetchError)}
            />
        )
    }

    return (
        <StandardPageWrapper>
            <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink as={NextLink} href={PAGE_URLS.home}>
                        All Stations
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>{radioStation.display_name}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <Box sx={{ mt: 4 }}>
                <StationDisplay radioStation={radioStation} />
            </Box>
        </StandardPageWrapper>
    )
}
