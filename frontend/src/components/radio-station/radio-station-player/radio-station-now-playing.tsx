import { useRadioStationNowPlaying } from '@/api/radio-stations/hooks/use-radio-station-now-playing'
import { RadioStation } from '@/api/radio-stations/types/radio-station.type'
import { useRadioPlayerState } from '@/global-state/radio-player-state'
import { useIsIOS } from '@/utils/hooks/use-is-ios'
import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from '@headlessui/react'
import { cloneDeep, isEqual } from 'lodash'
import mime from 'mime'
import { useEffect, useRef } from 'react'
import { FaPause, FaPlay, FaStop } from 'react-icons/fa6'
import { ImVolumeHigh, ImVolumeLow, ImVolumeMedium, ImVolumeMute2 } from 'react-icons/im'

type RadioStationNowPlayingProps = {
    currentStation: RadioStation
}

export function RadioStationNowPlaying({ currentStation }: RadioStationNowPlayingProps) {
    const isIOS = useIsIOS()

    const { turnOff, play, pause, playing, volume, setVolume } = useRadioPlayerState()

    const { data: nowPlaying } = useRadioStationNowPlaying(currentStation.name)

    const lastNowPlayingRef = useRef(nowPlaying)

    useEffect(() => {
        if ('mediaSession' in navigator) {
            if (isEqual(nowPlaying, lastNowPlayingRef.current)) return

            lastNowPlayingRef.current = cloneDeep(nowPlaying)

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

        return () => {
            if ('mediaSession' in navigator) {
                navigator.mediaSession.metadata = null
            }
        }
    }, [nowPlaying])

    const handlePlayPause = () => {
        if (playing) {
            pause()
        } else {
            play()
        }
    }

    function getVolumeIcon(volume: number) {
        if (volume === 0) return <ImVolumeMute2 size={20} />
        if (volume < 33) return <ImVolumeLow size={20} />
        if (volume < 66) return <ImVolumeMedium size={20} />
        return <ImVolumeHigh size={20} />
    }

    return (
        <div className="fixed bottom-0 w-full border-t border-gray-300 bg-gray-100 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="mx-auto flex max-w-md items-center justify-between p-2 text-xs text-gray-900 dark:text-gray-100">
                {nowPlaying?.thumbnail_url ? (
                    <div className="relative mr-2 h-[32px] w-[32px] overflow-hidden rounded-sm bg-gray-200 dark:bg-gray-700">
                        <img
                            src={nowPlaying.thumbnail_url}
                            alt={nowPlaying.song_name ?? 'Current Song'}
                            loading="lazy"
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="mr-2 flex h-[32px] w-[32px] items-center justify-center overflow-hidden rounded-sm bg-gray-200 dark:bg-gray-700">
                        <span className="text-[10px] text-gray-700 dark:text-gray-300">No Img</span>
                    </div>
                )}

                <div className="flex h-[32px] flex-1 flex-col items-start justify-center overflow-hidden px-2">
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
                    {!isIOS && (
                        // IOS does not html element volume control
                        <Popover className="relative">
                            <PopoverButton
                                className="pt-1 transition-colors hover:text-blue-700 dark:hover:text-blue-400"
                                title="Volume"
                            >
                                {getVolumeIcon(volume)}
                            </PopoverButton>

                            <PopoverBackdrop className="fixed inset-0" />

                            <PopoverPanel anchor={{ to: 'bottom start', gap: '20px' }}>
                                <div className="flex h-[200px] w-[40px] flex-col items-center justify-center overflow-hidden rounded-lg bg-white dark:bg-gray-600">
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        step={1}
                                        value={volume}
                                        onChange={(e) => setVolume(Number(e.target.value))}
                                        className="rotate-[270deg]"
                                    />
                                </div>
                            </PopoverPanel>
                        </Popover>
                    )}
                    <button
                        onClick={handlePlayPause}
                        className="transition-colors hover:text-blue-700 dark:hover:text-blue-400"
                        title={playing ? 'Pause' : 'Play'}
                    >
                        {playing ? <FaPause size={20} /> : <FaPlay size={20} />}
                    </button>
                    <button
                        onClick={turnOff}
                        className="transition-colors hover:text-red-700 dark:hover:text-red-400"
                        title="Stop"
                    >
                        <FaStop size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}
