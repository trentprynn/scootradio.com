import { RadioStation } from '@/api/radio-stations/types/radio-station.type'
import { useRadioPlayerState } from '@/global-state/radio-player-state'
import { useEffect, useRef } from 'react'
import { useEffectOnce } from 'react-use'

type RadioStationAudioPlayerProps = {
    currentStation: RadioStation
}

function isInterruptedPlayError(error: unknown) {
    return error instanceof DOMException && error.name === 'AbortError'
}

export const RadioStationAudioPlayer = ({ currentStation }: RadioStationAudioPlayerProps) => {
    const { setLoading, pause, playing, play, volume } = useRadioPlayerState()

    const audioElementRef = useRef<HTMLAudioElement | null>(null)

    useEffectOnce(() => {
        // setup / teardown audio element
        const audioElement = new Audio(`${currentStation.stream_url}?nocache=${Date.now()}`)

        audioElement.addEventListener('play', play)
        audioElement.addEventListener('pause', pause)

        audioElementRef.current = audioElement

        return () => {
            audioElement.removeEventListener('play', play)
            audioElement.removeEventListener('pause', pause)
            audioElement.pause()
            audioElement.src = 'data:,'
            audioElement.load()
            audioElementRef.current = null
        }
    })

    useEffect(() => {
        // play / pause sync
        const audioElement = audioElementRef.current
        if (audioElement) {
            if (playing) {
                setLoading(true)
                audioElement
                    .play()
                    .catch((error) => {
                        if (isInterruptedPlayError(error)) {
                            return
                        }

                        console.error('Error playing audio:', error)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            } else {
                audioElement.pause()
            }
        }
    }, [playing, setLoading])

    useEffect(() => {
        // volume sync
        const audioElement = audioElementRef.current
        if (audioElement) {
            audioElement.volume = volume / 100 // 50 -> 0.5
        }
    }, [volume])

    return null
}
