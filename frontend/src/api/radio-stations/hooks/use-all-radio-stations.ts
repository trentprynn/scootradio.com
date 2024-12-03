import { API_URLS } from '@/api/api-url-constants'
import { LOUD_ZOD_FAILURE_ENABLED } from '@/config/app-settings'
import { getAxiosInstance } from '@/config/axios-instance'
import { useQuery } from 'react-query'
import { RadioStation, RadioStationSchema } from '../types/radio-station.type'

export const useAllRadioStations = () => {
    return useQuery({
        queryKey: [API_URLS.radio_stations.fetchAll],
        queryFn: async () => {
            const url = API_URLS.radio_stations.fetchAll

            const axiosInstance = getAxiosInstance()

            return await axiosInstance.get<RadioStation[]>(url).then((res) => {
                const parsedResult = RadioStationSchema.array().safeParse(res.data)

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
    })
}
