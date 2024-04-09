import { useQuery } from 'react-query'
import { radioStationAPI } from '../fetchers/radio-station-api'

const BASE_QUERY_KEY = 'radio-station-now-playing'

export const useRadioStationNowPlaying = (stationName: string | null) => {
    return useQuery({
        queryKey: [BASE_QUERY_KEY, stationName],
        queryFn: async () => {
            if (!stationName) {
                throw new Error('stationName missing during fetch')
            }

            return radioStationAPI.fetchRadioStationNowPlaying(stationName!)
        },
        refetchInterval: 10000, // 10 seconds
        refetchOnWindowFocus: true,
        refetchIntervalInBackground: true,
        enabled: !!stationName,
    })
}
