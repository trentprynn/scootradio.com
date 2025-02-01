import { API_URLS } from '@/api/api-url-constants'
import { FetchError } from '@/api/fetch-error.type'
import {
    RadioStationNowPlaying,
    RadioStationNowPlayingSchema,
} from '@/api/radio-stations/types/radio-station-now-playing.type'
import { LOUD_ZOD_FAILURE_ENABLED } from '@/config/app-settings'

export async function fetchRadioStationNowPlaying(
    stationName: string,
    fetchOptions?: RequestInit
): Promise<RadioStationNowPlaying> {
    const url = API_URLS.radio_stations.fetchNowPlaying(stationName)

    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
        throw new FetchError(`Failed to fetch now playing info.`, {
            url,
            status: response.status,
            body: await response.text(),
        })
    }

    const data = await response.json()

    const parsedResult = RadioStationNowPlayingSchema.safeParse(data)
    if (!parsedResult.success) {
        console.error(`Failed to parse result from ${url}`, parsedResult.error)

        if (LOUD_ZOD_FAILURE_ENABLED) {
            throw parsedResult.error
        }

        return data
    }

    return parsedResult.data
}
