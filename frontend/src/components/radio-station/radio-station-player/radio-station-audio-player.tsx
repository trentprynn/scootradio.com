import { RadioStation } from '@/api/radio-stations/types/radio-station.type'
import { useRadioPlayerState } from '@/global-state/radio-player-state'
import { useEffect, useState } from 'react'
import { useEffectOnce } from 'react-use'

type RadioStationAudioPlayerProps = {
    currentStation: RadioStation
}

export const RadioStationAudioPlayer = ({ currentStation }: RadioStationAudioPlayerProps) => {
    const { setLoading, pause, playing, play, volume } = useRadioPlayerState()

    const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

    useEffectOnce(() => {
        // setup / teardown audio element
        const audioElement = new Audio(`${currentStation.stream_url}?nocache=${Date.now()}`)

        audioElement.addEventListener('play', play)
        audioElement.addEventListener('pause', pause)

        setAudioElement(audioElement)

        return () => {
            audioElement.removeEventListener('play', play)
            audioElement.removeEventListener('pause', pause)
            audioElement.pause()
            audioElement.src = 'data:,'
            audioElement.load()
            setAudioElement(null)
        }
    })

    useEffect(() => {
        // play / pause sync
        if (audioElement) {
            if (playing) {
                setLoading(true)
                audioElement
                    .play()
                    .catch((error) => {
                        console.error('Error playing audio:', error)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            } else {
                audioElement.pause()
            }
        }
    }, [audioElement, playing, setLoading])

    useEffect(() => {
        // volume sync
        if (audioElement) {
            audioElement.volume = volume / 100 // 50 -> 0.5
        }
    }, [audioElement, volume])

    return null
}
