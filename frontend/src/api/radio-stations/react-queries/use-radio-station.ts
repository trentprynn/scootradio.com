import { useQuery } from 'react-query'
import { radioStationAPI } from '../fetchers/radio-station-api'

const BASE_QUERY_KEY = 'radio-station'

export const useRadioStation = (stationName: string) => {
    return useQuery({
        queryKey: [BASE_QUERY_KEY, stationName],
        queryFn: async () => {
            return radioStationAPI.fetchRadioStation(stationName)
        },
    })
}
