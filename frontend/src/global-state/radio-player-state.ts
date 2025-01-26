import { RadioStation } from '@/api/radio-stations/types/radio-station.type'
import { create } from 'zustand'

interface RadioPlayerState {
    currentStation: RadioStation | null
    loading: boolean
    playing: boolean
    volume: number
    playStation: (station: RadioStation) => void
    play: () => void
    setLoading: (loading: boolean) => void
    setVolume: (volume: number) => void
    pause: () => void
    turnOff: () => void
}

export const useRadioPlayerState = create<RadioPlayerState>()((set) => ({
    currentStation: null,
    playing: false,
    loading: false,
    volume: 50,
    playStation: (station: RadioStation) => {
        set(() => ({ currentStation: station, playing: true, volume: 25 }))
    },
    play: () => {
        set(() => ({ playing: true }))
    },
    setLoading: (loading: boolean) => {
        set(() => ({ loading: loading }))
    },
    setVolume: (volume: number) => {
        set(() => ({ volume: volume }))
    },
    pause: () => {
        set(() => ({ playing: false }))
    },
    turnOff: () => {
        set(() => ({ currentStation: null, playing: false, loading: false, volume: 50 }))
    },
}))
