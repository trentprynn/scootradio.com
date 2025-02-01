import { API_URLS } from '@/api/api-url-constants'
import { FetchError } from '@/api/fetch-error.type'
import { RadioStation, RadioStationSchema } from '@/api/radio-stations/types/radio-station.type'
import { LOUD_ZOD_FAILURE_ENABLED } from '@/config/app-settings'

export async function fetchAllRadioStations(fetchOptions?: RequestInit): Promise<RadioStation[]> {
    const url = API_URLS.radio_stations.fetchAll

    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
        throw new FetchError(`Failed to fetch all radio stations.`, {
            url,
            status: response.status,
            body: await response.text(),
        })
    }

    const data = await response.json()

    const parsedResult = RadioStationSchema.array().safeParse(data)
    if (!parsedResult.success) {
        console.error(`Failed to parse result from ${url}`, parsedResult.error)

        if (LOUD_ZOD_FAILURE_ENABLED) {
            throw parsedResult.error
        }

        return data
    }

    return parsedResult.data
}
