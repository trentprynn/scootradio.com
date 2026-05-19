import { fetchAllRadioStations } from '@/api/radio-stations/fetchers/fetch-all-radio-stations'
import type { RadioStation } from '@/api/radio-stations/types/radio-station.type'
import { LargeErrorMessageDisplay } from '@/components/error-handling/large-error-message-display'
import { StandardPageWrapper } from '@/components/layout/standard-page-wrapper'
import { RadioStationList } from '@/components/radio-station/radio-station-list/radio-station-list'
import { SITE_URL } from '@/config/app-settings'
import type { DisplayError } from '@/utils/functions/error-handling'
import { getErrorMessage } from '@/utils/functions/error-handling'
import type { Metadata } from 'next'

export const revalidate = 3600 // 1hr

const title = 'ScootRadio | Public Radio Streaming'
const description = 'ScootRadio is an ad-free way to listen to curated public radio stations.'

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: SITE_URL,
    },
    openGraph: {
        title,
        description,
        url: SITE_URL,
        siteName: 'ScootRadio',
        type: 'website',
        images: [
            {
                url: `${SITE_URL}/logo.png`,
                alt: 'ScootRadio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [`${SITE_URL}/logo.png`],
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default async function Home() {
    let radioStations: RadioStation[] | null = null
    let displayError: DisplayError | null = null

    try {
        radioStations = await fetchAllRadioStations({
            next: {
                revalidate,
            },
        })
    } catch (error) {
        displayError = getErrorMessage(error)
    }

    if (displayError) {
        return (
            <StandardPageWrapper>
                <LargeErrorMessageDisplay displayError={displayError} />
            </StandardPageWrapper>
        )
    }

    return (
        <StandardPageWrapper>
            <RadioStationList radioStations={radioStations ?? []} />
        </StandardPageWrapper>
    )
}
