import { RadioStation } from '@/api/radio-stations/types/radio-station.type'
import { create } from 'zustand'

interface RadioPlayerState {
    currentStation: RadioStation | null
    isPlaying: boolean
    playStation: (station: RadioStation) => void
    play: () => void
    pause: () => void
    turnOff: () => void
}

export const useRadioPlayerState = create<RadioPlayerState>()((set) => ({
    currentStation: null,
    isPlaying: false,
    playStation: (station: RadioStation) => {
        set(() => ({ currentStation: station, isPlaying: true }))
    },
    play: () => {
        set(() => ({ isPlaying: true }))
    },
    pause: () => {
        set(() => ({ isPlaying: false }))
    },
    turnOff: () => {
        set(() => ({ currentStation: null, isPlaying: false }))
    },
}))
