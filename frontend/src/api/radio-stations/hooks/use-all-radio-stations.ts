import { fetchAllRadioStations } from '@/api/radio-stations/fetchers/fetch-all-radio-stations'
import { useQuery } from '@tanstack/react-query'

export const useAllRadioStations = () => {
    return useQuery({
        queryKey: ['all-radio-stations'],
        queryFn: async () => {
            return fetchAllRadioStations()
        },
    })
}
