import { z } from 'zod'

export const NowPlayingSchema = z.object({
    song_name: z.string().nullish(),
    album_name: z.string().nullish(),
    artist_name: z.string().nullish(),
    play_time: z.string().nullish(),
    thumbnail_url: z.string().nullish(),
})

export type NowPlaying = z.infer<typeof NowPlayingSchema>
