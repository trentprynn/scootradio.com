'use client'

import { useRadioStationNowPlaying } from '@/api/radio-stations/react-queries/use-radio-station-now-playing'
import { useRadioPlayerState } from '@/global-state/radio-player-state'
import { Box, Container, Flex, IconButton, Spinner, Stack, Text, Tooltip, useColorModeValue } from '@chakra-ui/react'
import lodash from 'lodash'
import mime from 'mime'
import { useEffect, useRef, useState } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'
import ReactPlayer from 'react-player'

export function CurrentlyPlayingBox() {
    const { currentStation, isPlaying, setIsPlaying } = useRadioPlayerState()

    const [loading, setLoading] = useState(false)

    const { data: nowPlaying } = useRadioStationNowPlaying(currentStation ? currentStation.name : null)

    const lastNowPlayingRef = useRef(nowPlaying)
    useEffect(() => {
        // the purpose of this effect is to watch changes to nowPlaying and
        // update the media session api with the new info

        if ('mediaSession' in navigator === false) {
            return
        }

        if (lodash.isEqual(nowPlaying, lastNowPlayingRef.current)) {
            return
        }

        lastNowPlayingRef.current = nowPlaying

        if (!nowPlaying) {
            navigator.mediaSession.metadata = null
            return
        }

        let artwork: MediaImage[] | undefined = undefined
        if (nowPlaying.thumbnail_url) {
            const thumbnailMimeType = mime.getType(nowPlaying.thumbnail_url)
            if (thumbnailMimeType) {
                artwork = [{ src: nowPlaying.thumbnail_url, sizes: '96x96', type: thumbnailMimeType }]
            }
        }

        navigator.mediaSession.metadata = new MediaMetadata({
            title: nowPlaying.song_name,
            artist: nowPlaying.artist_name,
            album: nowPlaying.album_name,
            artwork: artwork,
        })
    }, [nowPlaying])

    const lastStationRef = useRef(currentStation)
    useEffect(() => {
        if (lodash.isEqual(currentStation, lastStationRef.current)) {
            return
        }

        lastStationRef.current = currentStation

        setLoading(true)
    }, [currentStation])

    const bgColor = useColorModeValue('gray.200', 'gray.900')

    if (!currentStation) {
        return null
    }

    return (
        <>
            <Box position="sticky" bottom="0" width="100%" backgroundColor={bgColor} zIndex="sticky">
                <Container sx={{ height: '80px', overflow: 'hidden' }}>
                    <Flex gridGap={6} justifyContent={'space-between'} height={'100%'}>
                        <Flex direction={'column'} justifyContent={'center'}>
                            <Box>
                                <Text fontSize={'lg'} fontWeight={'bold'}>
                                    Now Playing
                                </Text>
                                <Text fontSize={'lg'} color="gray.500">
                                    {currentStation.display_name}
                                </Text>
                            </Box>
                        </Flex>
                        {!loading && nowPlaying && (
                            <Flex flex="1" direction={'column'} justifyContent={'center'}>
                                <Text fontSize={'md'} color="gray.500" fontWeight={'semibold'} noOfLines={1}>
                                    {nowPlaying.song_name}
                                </Text>
                                <Tooltip label={`${nowPlaying.song_name} - ${nowPlaying.album_name}`}>
                                    <Text fontSize={'sm'} color="gray.500" noOfLines={1}>
                                        {nowPlaying.artist_name} - {nowPlaying.album_name}
                                    </Text>
                                </Tooltip>

                                <Text fontSize={'sm'} color="gray.500" noOfLines={1}>
                                    {nowPlaying.play_time}
                                </Text>
                            </Flex>
                        )}
                        <Flex direction={'column'} justifyContent={'center'}>
                            {loading ? (
                                <Stack direction={'row'} alignItems={'center'}>
                                    <Spinner size="md" />
                                </Stack>
                            ) : (
                                <IconButton
                                    aria-label="Play pause button"
                                    icon={isPlaying ? <FaPause /> : <FaPlay />}
                                    onClick={() => setIsPlaying(!isPlaying)}
                                />
                            )}
                        </Flex>
                    </Flex>
                </Container>
            </Box>

            <Box hidden>
                <ReactPlayer
                    url={currentStation.stream_url}
                    playing={isPlaying}
                    onPlay={() => {
                        setLoading(false)

                        if (!isPlaying) {
                            setIsPlaying(true)
                        }
                    }}
                    onPause={() => setIsPlaying(false)}
                    onError={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                />
            </Box>
        </>
    )
}
