import { RadioStation } from '@/api/radio-stations/types/radio-station.type'
import { create } from 'zustand'

interface RadioPlayerState {
    currentStation: RadioStation | null
    setCurrentStation: (station: RadioStation | null) => void
    isPlaying: boolean
    setIsPlaying: (isPlaying: boolean) => void
}

export const useRadioPlayerState = create<RadioPlayerState>()((set) => ({
    currentStation: null,
    setCurrentStation: (to) => set(() => ({ currentStation: to })),
    isPlaying: false,
    setIsPlaying: (isPlaying) => set(() => ({ isPlaying })),
}))
