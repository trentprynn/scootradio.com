'use client'

import { useRadioStationNowPlaying } from '@/api/radio-stations/hooks/use-radio-station-now-playing'
import { RadioStation } from '@/api/radio-stations/types/radio-station.type'
import { useRadioPlayerState } from '@/global-state/radio-player-state'
import lodash from 'lodash'
import mime from 'mime'
import { useEffect, useRef, useState } from 'react'
import { FaPause, FaPlay, FaStop } from 'react-icons/fa6'

export const StationPlayer = () => {
    const { currentStation, isPlaying } = useRadioPlayerState()

    return (
        <>
            {currentStation && <StationNowPlayingDisplay currentStation={currentStation} />}
            {currentStation && isPlaying && (
                <StationAudioPlayer key={currentStation.name} currentStation={currentStation} />
            )}
        </>
    )
}

type StationAudioPlayerProps = {
    currentStation: RadioStation
}

const StationAudioPlayer = ({ currentStation }: StationAudioPlayerProps) => {
    const [loading, setLoading] = useState(true)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        const audio = new Audio(currentStation.stream_url)
        audioRef.current = audio

        const handlePlay = () => setLoading(false)
        audio.addEventListener('play', handlePlay)

        audio.play().catch((error) => {
            if (error.name !== 'AbortError') {
                console.error('Error playing audio:', error)
            }
        })

        return () => {
            audio.removeEventListener('play', handlePlay)
            audio.pause()
            audio.src = 'data:,'
            audio.load()
            audioRef.current = null

            if ('mediaSession' in navigator) {
                navigator.mediaSession.metadata = null
            }
        }
    }, [currentStation.stream_url])

    return null
}

type StationNowPlayingDisplayProps = {
    currentStation: RadioStation
}

export function StationNowPlayingDisplay({ currentStation }: StationNowPlayingDisplayProps) {
    const { turnOff, play, pause, isPlaying } = useRadioPlayerState()
    const { data: nowPlaying } = useRadioStationNowPlaying(currentStation.name)

    const lastNowPlayingRef = useRef(nowPlaying)

    useEffect(() => {
        if ('mediaSession' in navigator) {
            if (lodash.isEqual(nowPlaying, lastNowPlayingRef.current)) return

            lastNowPlayingRef.current = lodash.cloneDeep(nowPlaying)

            if (!nowPlaying) {
                navigator.mediaSession.metadata = null
                return
            }

            let artwork: MediaImage[] | undefined
            if (nowPlaying.thumbnail_url) {
                const thumbnailMimeType = mime.getType(nowPlaying.thumbnail_url)
                if (thumbnailMimeType) {
                    artwork = [{ src: nowPlaying.thumbnail_url, sizes: '96x96', type: thumbnailMimeType }]
                }
            }

            navigator.mediaSession.metadata = new MediaMetadata({
                title: nowPlaying.song_name ?? undefined,
                artist: nowPlaying.artist_name ?? undefined,
                album: nowPlaying.album_name ?? undefined,
                artwork: artwork,
            })
        }
    }, [nowPlaying])

    const handlePlayPause = () => {
        if (isPlaying) {
            pause()
        } else {
            play()
        }
    }

    // Using fixed positioning to ensure no gap and always at bottom
    return (
        <div className="fixed bottom-0 z-50 w-full border-t border-gray-300 bg-gray-100 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="mx-auto flex max-w-md items-center justify-between p-2 text-xs text-gray-900 dark:text-gray-100">
                {nowPlaying?.thumbnail_url ? (
                    <div className="relative mr-2 h-8 w-8 overflow-hidden rounded bg-gray-200 dark:bg-gray-700">
                        <img
                            src={nowPlaying.thumbnail_url}
                            alt={nowPlaying.song_name ?? 'Current Song'}
                            className="h-full w-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="mr-2 flex h-8 w-8 items-center justify-center rounded bg-gray-200 dark:bg-gray-700">
                        <span className="text-[10px] text-gray-700 dark:text-gray-300">No Img</span>
                    </div>
                )}

                <div className="flex flex-1 flex-col items-start justify-center overflow-hidden px-2">
                    {nowPlaying ? (
                        <>
                            <p className="w-full truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {nowPlaying.song_name}
                            </p>
                            <p className="w-full truncate text-[0.75rem] text-gray-700 dark:text-gray-400">
                                {nowPlaying.artist_name} - {nowPlaying.album_name}
                            </p>
                        </>
                    ) : (
                        <p className="w-full truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                            Now Playing {currentStation.display_name}
                        </p>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={handlePlayPause}
                        className="transition-colors hover:text-blue-700 dark:hover:text-blue-400"
                        title={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button
                        onClick={turnOff}
                        className="transition-colors hover:text-red-700 dark:hover:text-red-400"
                        title="Stop"
                    >
                        <FaStop />
                    </button>
                </div>
            </div>
        </div>
    )
}
