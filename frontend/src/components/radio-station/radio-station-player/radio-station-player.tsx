'use client'

import { useRadioPlayerState } from '@/global-state/radio-player-state'

import { RadioStationAudioPlayer } from './radio-station-audio-player'
import { RadioStationNowPlaying } from './radio-station-now-playing'

export const RadioStationPlayer = () => {
    const { currentStation } = useRadioPlayerState()

    if (!currentStation) {
        return null
    }

    return (
        <>
            <RadioStationNowPlaying currentStation={currentStation} />
            <RadioStationAudioPlayer key={currentStation.name} currentStation={currentStation} />
        </>
    )
}
