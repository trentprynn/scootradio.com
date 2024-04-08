import { API_URLS } from '@/api/api-url-constants'
import { LOUD_ZOD_FAILURE_ENABLED } from '@/config/app-settings'
import { getAxiosInstance } from '@/config/axios-instance'
import { NowPlaying, NowPlayingSchema } from '../types/now-playing.type'
import { RadioStation, RadioStationSchema } from '../types/radio-station.type'

const fetchAllRadioStations = async (): Promise<RadioStation[]> => {
    const url = API_URLS.radio_stations.fetchAll()

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
}

const fetchRadioStation = async (stationName: string): Promise<RadioStation> => {
    const url = API_URLS.radio_stations.fetch(stationName)

    const axiosInstance = getAxiosInstance()

    return await axiosInstance.get<RadioStation>(url).then((res) => {
        const parsedResult = RadioStationSchema.safeParse(res.data)

        if (!parsedResult.success) {
            console.error(`Failed to parse result from ${url}`, parsedResult.error)

            if (LOUD_ZOD_FAILURE_ENABLED) {
                throw parsedResult.error
            }

            return res.data
        }

        return parsedResult.data
    })
}

const fetchRadioStationNowPlaying = async (stationName: string): Promise<NowPlaying> => {
    const url = API_URLS.radio_stations.fetchNowPlaying(stationName)

    const axiosInstance = getAxiosInstance()

    return await axiosInstance.get<NowPlaying>(url).then((res) => {
        const parsedResult = NowPlayingSchema.safeParse(res.data)

        if (!parsedResult.success) {
            console.error(`Failed to parse result from ${url}`, parsedResult.error)

            if (LOUD_ZOD_FAILURE_ENABLED) {
                throw parsedResult.error
            }

            return res.data
        }

        return parsedResult.data
    })
}

export const radioStationAPI = {
    fetchAllRadioStations,
    fetchRadioStation,
    fetchRadioStationNowPlaying,
}
