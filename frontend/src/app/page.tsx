import { fetchAllRadioStations } from '@/api/radio-stations/fetchers/fetch-all-radio-stations'
import { StandardPageWrapper } from '@/components/layout/standard-page-wrapper'
import { RadioStationList } from '@/components/radio-station/radio-station-list/radio-station-list'
import { SITE_URL } from '@/config/app-settings'
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
    const radioStations = await fetchAllRadioStations({
        next: {
            revalidate,
        },
    })

    return (
        <StandardPageWrapper>
            <RadioStationList radioStations={radioStations} />
        </StandardPageWrapper>
    )
}
