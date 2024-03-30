'use client'

import { useRadioPlayerState } from '@/global-state/radio-player-state'
import { Box, Container, IconButton, Spinner, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import lodash from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'
import ReactPlayer from 'react-player'

export function CurrentlyPlayingBox() {
    const { currentStation, isPlaying, setIsPlaying } = useRadioPlayerState()

    const [loading, setLoading] = useState(false)

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
            <Box position="sticky" bottom="0" width="100%" backgroundColor={bgColor} p={4} zIndex="sticky">
                <Container>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Box>
                            <Text fontSize={'large'}>Now Playing</Text>
                            <Text>{currentStation.display_name}</Text>
                        </Box>

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
                    </Stack>
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
