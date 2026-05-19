import { API_BASE_URL } from '@/config/app-settings'

export const API_URLS = {
    radio_stations: {
        fetchAll: `${API_BASE_URL}/radio-stations`,
        fetch: (stationName: string) => `${API_BASE_URL}/radio-stations/${stationName}`,
        fetchNowPlaying: (stationName: string) => `${API_BASE_URL}/radio-stations/${stationName}/now-playing`,
    },
}
