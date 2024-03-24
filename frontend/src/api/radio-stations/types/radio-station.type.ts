import { z } from 'zod'

export const RadioStationSchema = z.object({
    name: z.string(),
    display_name: z.string(),
    stream_url: z.string(),
    description: z.string(),
    image_url: z.string(),
})

export type RadioStation = z.infer<typeof RadioStationSchema>
