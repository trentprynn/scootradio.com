import { getAxiosInstance } from '@/config/axios-instance'
import { useQuery } from 'react-query'

import { API_URLS } from '@/api/api-url-constants'
import { LOUD_ZOD_FAILURE_ENABLED } from '@/config/app-settings'
import { RadioStationNowPlaying, RadioStationNowPlayingSchema } from '../types/radio-station-now-playing.type'

export const useRadioStationNowPlaying = (stationName: string) => {
    const url = API_URLS.radio_stations.fetchNowPlaying(stationName)
    return useQuery({
        queryKey: [url],
        queryFn: async () => {
            const axiosInstance = getAxiosInstance()

            return await axiosInstance.get<RadioStationNowPlaying>(url).then((res) => {
                const parsedResult = RadioStationNowPlayingSchema.safeParse(res.data)

                if (!parsedResult.success) {
                    console.error(`Failed to parse result from ${url}`, parsedResult.error)

                    if (LOUD_ZOD_FAILURE_ENABLED) {
                        throw parsedResult.error
                    }

                    return res.data
                }

                return parsedResult.data
            })
        },
        refetchInterval: 10000, // poll every 10 seconds
        refetchIntervalInBackground: true,
    })
}
