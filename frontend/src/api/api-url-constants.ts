export const API_URLS = {
    radio_stations: {
        fetch: (stationName: string) => `/radio-stations/${stationName}`,
        fetchNowPlaying: (stationName: string) => `/radio-stations/${stationName}/now-playing`,
        fetchAll: () => '/radio-stations',
    },
}
