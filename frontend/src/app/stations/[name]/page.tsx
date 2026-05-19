import { FetchError } from '@/api/fetch-error.type'
import { fetchAllRadioStations } from '@/api/radio-stations/fetchers/fetch-all-radio-stations'
import { fetchRadioStation } from '@/api/radio-stations/fetchers/fetch-radio-station'
import { StandardPageWrapper } from '@/components/layout/standard-page-wrapper'
import { LargeRadioStationDisplay } from '@/components/radio-station/radio-station-display/large-radio-station-display'
import { SITE_URL } from '@/config/app-settings'
import { Button } from '@headlessui/react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'

type Props = {
    params: Promise<{ name: string }>
}

export const revalidate = 3600 // 1hr

const getRadioStation = cache((stationName: string) => {
    return fetchRadioStation(stationName, {
        next: {
            revalidate,
        },
    })
})

export async function generateStaticParams() {
    const stations = await fetchAllRadioStations({
        next: {
            revalidate,
        },
    })

    return stations.map((station) => ({
        name: station.name,
    }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata | void> {
    const stationName = (await params).name

    try {
        const station = await getRadioStation(stationName)

        const stationUrl = `${SITE_URL}/stations/${station.name}`
        const title = `${station.seo_title} | ScootRadio`

        return {
            title,
            description: station.seo_description,
            alternates: {
                canonical: stationUrl,
            },
            openGraph: {
                title,
                description: station.seo_description,
                url: stationUrl,
                siteName: 'ScootRadio',
                type: 'website',
                images: [
                    {
                        url: station.image_url,
                        alt: `${station.display_name} station artwork`,
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description: station.seo_description,
                images: [station.image_url],
            },
            robots: {
                index: true,
                follow: true,
            },
        }
    } catch (error) {
        if (error instanceof FetchError && error.status === 404) {
            return notFound()
        }

        throw error
    }
}

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
    const stationName = (await params).name
    const radioStationResult = await getRadioStation(stationName).catch((error) => {
        if (error instanceof FetchError && error.status === 404) {
            notFound()
        }

        throw error
    })

    return (
        <StandardPageWrapper>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'RadioStation',
                        name: radioStationResult.display_name,
                        alternateName: radioStationResult.call_sign,
                        description: radioStationResult.long_description,
                        url: `${SITE_URL}/stations/${radioStationResult.name}`,
                        image: radioStationResult.image_url,
                        dateModified: radioStationResult.content_updated_at,
                        areaServed: `${radioStationResult.city}, ${radioStationResult.region}`,
                        broadcastFrequency: radioStationResult.frequency,
                        address: {
                            '@type': 'PostalAddress',
                            addressLocality: radioStationResult.city,
                            addressRegion: radioStationResult.region,
                            addressCountry: radioStationResult.country,
                        },
                        sameAs: [radioStationResult.website_url, radioStationResult.playlist_url].filter(Boolean),
                    }).replace(/</g, '\\u003c'),
                }}
            />
            <div className="flex flex-col items-center justify-center">
                <div className="w-full max-w-3xl">
                    <div className="mb-4">
                        <Link href="/">
                            <Button className="mt-2 cursor-pointer rounded-md bg-emerald-400 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 focus:outline-none sm:mt-0 dark:bg-emerald-400 dark:hover:bg-emerald-600">
                                <div className="flex items-center gap-2">
                                    <IoMdArrowRoundBack size={20} />
                                    <span>More Stations</span>
                                </div>
                            </Button>
                        </Link>
                    </div>

                    <LargeRadioStationDisplay radioStation={radioStationResult} />
                </div>
            </div>
        </StandardPageWrapper>
    )
}
