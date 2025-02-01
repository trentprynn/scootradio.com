import { fetchRadioStationNowPlaying } from '@/api/radio-stations/fetchers/fetch-radio-station-now-playing'
import { useQuery } from 'react-query'

export const useRadioStationNowPlaying = (stationName: string) => {
    return useQuery({
        queryKey: ['radio-station-now-playing', stationName],
        queryFn: async () => {
            return fetchRadioStationNowPlaying(stationName)
        },
        refetchInterval: 10000, // poll every 10 seconds
        refetchIntervalInBackground: true,
    })
}
