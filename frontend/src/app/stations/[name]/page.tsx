import { FetchError } from '@/api/fetch-error.type'
import { fetchRadioStation } from '@/api/radio-stations/fetchers/fetch-radio-station'
import { LargeErrorMessageDisplay } from '@/components/error-handling/large-error-message-display'
import { StandardPageWrapper } from '@/components/layout/standard-page-wrapper'
import { LargeRadioStationDisplay } from '@/components/radio-station/radio-station-display/large-radio-station-display'
import { getErrorMessage } from '@/utils/functions/error-handling'
import { Button } from '@headlessui/react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { IoMdArrowRoundBack } from 'react-icons/io'

type Props = {
    params: Promise<{ name: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata | void> {
    const stationName = (await params).name

    try {
        const station = await fetchRadioStation(stationName, {
            cache: 'force-cache',
        })

        return {
            title: `${station.display_name} | ScootRadio`,
            description: `Stream ${station.display_name} online for free on ScootRadio`,
            openGraph: {
                images: [station.image_url],
            },
        }
    } catch (error) {
        if (error instanceof FetchError && error.status === 404) {
            return notFound()
        }
        return
    }
}

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
    const stationName = (await params).name

    try {
        const radioStation = await fetchRadioStation(stationName, {
            cache: 'force-cache',
        })

        return (
            <StandardPageWrapper>
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full max-w-2xl">
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

                        <LargeRadioStationDisplay radioStation={radioStation} />
                    </div>
                </div>
            </StandardPageWrapper>
        )
    } catch (error) {
        const displayError = getErrorMessage(error)
        return <LargeErrorMessageDisplay displayError={displayError} />
    }
}
