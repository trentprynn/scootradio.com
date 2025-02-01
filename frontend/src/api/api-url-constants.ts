// process.env.INTERNAL_API_BASE_URL -> used during internal SSR calls
// process.env.NEXT_PUBLIC_API_BASE_URL -> used during client-side calls
const API_BASE_URL = process.env.INTERNAL_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'MISSING_API_BASE_URL'

export const API_URLS = {
    radio_stations: {
        fetchAll: `${API_BASE_URL}/radio-stations`,
        fetch: (stationName: string) => `${API_BASE_URL}/radio-stations/${stationName}`,
        fetchNowPlaying: (stationName: string) => `${API_BASE_URL}/radio-stations/${stationName}/now-playing`,
    },
}
