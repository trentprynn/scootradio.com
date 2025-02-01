import { fetchAllRadioStations } from '@/api/radio-stations/fetchers/fetch-all-radio-stations'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const radioStations = await fetchAllRadioStations({ cache: 'no-store' })

    const radioStationPageSitemapEntities = radioStations.map((station) => {
        return {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/stations/${station.name}`,
            lastModified: new Date(),
        }
    })

    return [
        // homepage
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            lastModified: new Date(),
        },
        // individual radio station pages
        ...radioStationPageSitemapEntities,
    ]
}
