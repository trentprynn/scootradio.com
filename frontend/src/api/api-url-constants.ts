export const API_URLS = {
    radio_stations: {
        fetch: (stationName: string) => `/radio-stations/${stationName}`,
        fetchAll: () => '/radio-stations',
    },
}
