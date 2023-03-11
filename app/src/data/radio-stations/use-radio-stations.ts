import { RadioStation } from '@/types/radio/radio-station.type'
import useImmutableSWR from 'swr'

export default function useRadioStations() {
    const { data, mutate, error } = useImmutableSWR<RadioStation[]>(`/radioStations`)

    const loading = !!(!data && !error)

    return {
        radioStationsLoading: loading,
        radioStations: data,
        radioStationFetchError: error,
        mutateRadioStations: mutate,
    }
}
