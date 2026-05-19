'use client'

import { RadioStation } from '@/api/radio-stations/types/radio-station.type'
import { RadioStationFavoriteButton } from '@/components/radio-station/radio-station-display/radio-station-favorite-button'
import { RadioStationPlayButton } from '@/components/radio-station/radio-station-display/radio-station-play-button'
import { useRadioPlayerState } from '@/global-state/radio-player-state'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'

type LargeRadioStationDisplayProps = {
    radioStation: RadioStation
}

export function LargeRadioStationDisplay({ radioStation }: LargeRadioStationDisplayProps) {
    const { currentStation, playStation } = useRadioPlayerState()

    const isCurrentStationPlaying = currentStation?.name === radioStation.name
    const shouldShowCallSignEyebrow = radioStation.call_sign !== radioStation.display_name

    const stationFacts = [
        { label: 'Call sign', value: radioStation.call_sign },
        { label: 'Frequency', value: radioStation.frequency },
        { label: 'Location', value: `${radioStation.city}, ${radioStation.region}` },
        { label: 'Format', value: radioStation.format },
    ]

    const stationLinks = [
        { label: 'Official site', href: radioStation.website_url },
        { label: 'Playlist', href: radioStation.playlist_url },
    ].filter((link): link is { label: string; href: string } => Boolean(link.href))

    return (
        <article className="mx-auto max-w-2xl overflow-hidden rounded-lg bg-slate-100 shadow-md md:max-w-3xl dark:bg-gray-800">
            <div className="px-4 py-4 sm:px-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        {shouldShowCallSignEyebrow ? (
                            <p className="text-xs font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-300">
                                {radioStation.call_sign}
                            </p>
                        ) : null}
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">
                            {radioStation.display_name}
                        </h1>
                        <p className="mt-1 text-sm font-medium text-gray-500 sm:text-base dark:text-gray-300">
                            {radioStation.tagline}
                        </p>
                    </div>

                    <RadioStationFavoriteButton radioStationName={radioStation.name} />
                </div>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base dark:text-gray-300">
                    {radioStation.long_description} Listen online for free powered by ScootRadio.
                </p>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <RadioStationPlayButton
                        isPlaying={isCurrentStationPlaying}
                        onPlay={() => playStation(radioStation)}
                    />
                </div>
            </div>

            <div className="px-4 py-4 sm:px-6">
                <div className="mb-5 flex justify-center">
                    <img
                        loading="lazy"
                        src={radioStation.image_url}
                        alt={`${radioStation.display_name} station artwork`}
                        className="max-h-56 w-auto max-w-full rounded-md object-contain sm:max-h-64"
                    />
                </div>

                <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {stationFacts.map((fact) => (
                        <div key={fact.label} className="rounded-md bg-white/70 px-3 py-2 dark:bg-gray-900/40">
                            <dt className="text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
                                {fact.label}
                            </dt>
                            <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">{fact.value}</dd>
                        </div>
                    ))}
                </dl>

                <div className="mt-4 flex flex-wrap gap-3 sm:justify-end">
                    {stationLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-100"
                        >
                            <span>{link.label}</span>
                            <FaArrowUpRightFromSquare size={12} />
                        </a>
                    ))}
                </div>
            </div>
        </article>
    )
}
