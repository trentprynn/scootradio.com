export const API_URLS = {
    radio_stations: {
        fetchAll: '/radio-stations',
        fetchNowPlaying: (stationName: string) => `/radio-stations/${stationName}/now-playing`,
    },
}
