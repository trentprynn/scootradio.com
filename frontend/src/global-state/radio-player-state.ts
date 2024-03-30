import { RadioStation } from '@/api/radio-stations/types/radio-station.type'
import { create } from 'zustand'

interface RadioPlayerState {
    currentStation: RadioStation | null
    playStation: (station: RadioStation) => void
    turnOff: () => void
    isPlaying: boolean
    setIsPlaying: (isPlaying: boolean) => void
}

export const useRadioPlayerState = create<RadioPlayerState>()((set) => ({
    currentStation: null,
    playStation: (station: RadioStation) => {
        set(() => ({ currentStation: station, isPlaying: true }))
    },
    turnOff: () => {
        set(() => ({ currentStation: null, isPlaying: false }))
    },
    isPlaying: false,
    setIsPlaying: (isPlaying) => set(() => ({ isPlaying })),
}))
