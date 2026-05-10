'use client'

import { Button } from '@headlessui/react'
import { FaPlay, FaVolumeHigh } from 'react-icons/fa6'
import Wave from 'react-wavify'

type RadioStationPlayButtonProps = {
    isPlaying: boolean
    onPlay: () => void
    label?: string
}

export function RadioStationPlayButton({ isPlaying, onPlay, label = 'Listen Live' }: RadioStationPlayButtonProps) {
    if (isPlaying) {
        return (
            <div className="relative inline-flex h-9 w-full max-w-41 items-center justify-center gap-2 overflow-hidden rounded-md bg-blue-500 px-4 text-sm font-semibold whitespace-nowrap text-white">
                <Wave
                    fill="#f79902"
                    paused={false}
                    className="pointer-events-none absolute right-0 bottom-0 left-0 h-9 opacity-95"
                    options={{
                        height: 12,
                        amplitude: 8,
                        speed: 0.32,
                        points: 4,
                    }}
                    style={{ transform: 'translateY(32%)' }}
                />
                <FaVolumeHigh size={14} className="relative drop-shadow-xs" />
                <span className="relative drop-shadow-xs">Now Playing</span>
            </div>
        )
    }

    return (
        <Button
            onClick={onPlay}
            className="inline-flex h-9 w-full max-w-41 cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-500 px-4 text-sm font-semibold whitespace-nowrap text-white hover:bg-blue-600 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
        >
            <FaPlay size={12} />
            <span>{label}</span>
        </Button>
    )
}
