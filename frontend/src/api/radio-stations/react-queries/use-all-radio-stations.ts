import { useQuery } from 'react-query'
import { radioStationAPI } from '../fetchers/radio-station-api'

const BASE_QUERY_KEY = 'all-radio-station'

export const useAllRadioStations = () => {
    return useQuery({
        queryKey: [BASE_QUERY_KEY],
        queryFn: async () => {
            return radioStationAPI.fetchAllRadioStations()
        },
    })
}
