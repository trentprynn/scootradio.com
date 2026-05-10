import { z } from 'zod'

export const RadioStationSchema = z.object({
    name: z.string(),
    display_name: z.string(),
    stream_url: z.string(),
    description: z.string(),
    long_description: z.string(),
    image_url: z.string(),
    call_sign: z.string(),
    frequency: z.string(),
    city: z.string(),
    region: z.string(),
    country: z.string(),
    website_url: z.string(),
    format: z.string(),
    tagline: z.string(),
    seo_title: z.string(),
    seo_description: z.string(),
    content_updated_at: z.string(),
    playlist_url: z.string().nullable(),
})

export type RadioStation = z.infer<typeof RadioStationSchema>
