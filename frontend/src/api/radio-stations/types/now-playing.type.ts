import { z } from 'zod'

export const NowPlayingSchema = z.object({
    song_name: z.string().optional(),
    album_name: z.string().optional(),
    artist_name: z.string().optional(),
    play_time: z.string().optional(),
    thumbnail_url: z.string().optional(),
})

export type NowPlaying = z.infer<typeof NowPlayingSchema>
