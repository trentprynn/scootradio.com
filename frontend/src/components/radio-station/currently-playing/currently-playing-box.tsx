'use client'

import { useRadioPlayerState } from '@/global-state/radio-player-state'
import { Box, Container, IconButton, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'

export function CurrentlyPlayingBox() {
    const { currentStation, isPlaying, setIsPlaying } = useRadioPlayerState()

    const bgColor = useColorModeValue('gray.200', 'gray.900')

    const videoRef = useRef<HTMLVideoElement | null>(null)

    const lastPlayedStationRef = useRef<string | null>(null)
    useEffect(() => {
        // the purpose of this effect is to player
        // the radio station when the current station changes

        if (!videoRef.current) {
            return
        }

        if (!currentStation) {
            return
        }

        if (currentStation.name == lastPlayedStationRef.current) {
            return
        }

        lastPlayedStationRef.current = currentStation.name

        videoRef.current.src = currentStation.stream_url
        videoRef.current.play()
        setIsPlaying(true)

        // Add metadata for iOS "Now Playing"
        if ('metadata' in videoRef.current) {
            videoRef.current.metadata = {
                title: currentStation.display_name,
            }
        }
    }, [currentStation, setIsPlaying])

    useEffect(() => {
        if (!currentStation && isPlaying) {
            setIsPlaying(false)
        }
    }, [currentStation, isPlaying, setIsPlaying])

    const lastConsumedIsPlayingRef = useRef<boolean | null>(null)
    useEffect(() => {
        if (!videoRef.current) {
            return
        }

        if (lastConsumedIsPlayingRef.current === isPlaying) {
            return
        }

        lastConsumedIsPlayingRef.current = isPlaying

        if (isPlaying) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }, [isPlaying])

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

                        <IconButton
                            aria-label="Play pause button"
                            icon={isPlaying ? <FaPause /> : <FaPlay />}
                            onClick={() => setIsPlaying(!isPlaying)}
                        />
                    </Stack>
                </Container>
            </Box>

            <Box hidden>
                <video ref={videoRef} src={currentStation.stream_url} />
            </Box>
        </>
    )
}
