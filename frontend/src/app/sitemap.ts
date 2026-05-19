import { fetchAllRadioStations } from '@/api/radio-stations/fetchers/fetch-all-radio-stations'
import { SITE_URL } from '@/config/app-settings'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const radioStations = await fetchAllRadioStations({ cache: 'no-store' })

    const radioStationPageSitemapEntities = radioStations.map((station) => {
        return {
            url: `${SITE_URL}/stations/${station.name}`,
            lastModified: new Date(station.content_updated_at),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }
    })

    const homeLastModified = radioStations.reduce((latestDate, station) => {
        const stationUpdatedAt = new Date(station.content_updated_at)

        if (stationUpdatedAt > latestDate) {
            return stationUpdatedAt
        }

        return latestDate
    }, new Date(0))

    return [
        // homepage
        {
            url: SITE_URL,
            lastModified: homeLastModified,
            changeFrequency: 'weekly',
            priority: 1,
        },
        // individual radio station pages
        ...radioStationPageSitemapEntities,
    ]
}
