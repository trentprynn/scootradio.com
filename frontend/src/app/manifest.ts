import { SITE_URL } from '@/config/app-settings'
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        short_name: 'ScootRadio',
        name: 'ScootRadio',
        description: 'ScootRadio is an ad-free way to listen to curated public radio stations.',
        icons: [
            {
                src: `${SITE_URL}/favicon.ico`,
                sizes: '64x64 32x32 24x24 16x16',
                type: 'image/x-icon',
            },
            {
                src: `${SITE_URL}/logo192.png`,
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: `${SITE_URL}/logo512.png`,
                sizes: '512x512',
                type: 'image/png',
            },
        ],
        start_url: SITE_URL,
        display: 'browser',
        theme_color: '#000000',
        background_color: '#ffffff',
    }
}
