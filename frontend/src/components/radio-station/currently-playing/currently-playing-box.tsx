'use client'

import { useRadioPlayerState } from '@/global-state/radio-player-state'
import { Box, Container, IconButton, Stack, Text, useColorMode, useColorModeValue, useMediaQuery } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'

export function CurrentlyPlayingBox() {

    const {colorMode} = useColorMode()

    const { currentStation } = useRadioPlayerState()
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
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
    }, [currentStation])

    useEffect(() => {
        if (!currentStation) {
            setIsPlaying(false)
        }
    }, [currentStation])

    const handlePlayPause = () => {
        if (!videoRef.current) {
            return
        }

        if (isPlaying) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
        }

        setIsPlaying(!isPlaying)
    }

    if (!currentStation) {
        return null
    }

    return (
        <>
            <Box
                position="fixed"
                bottom="0"
                width="100%"
                backgroundColor={'blackAlpha.300'}

                p={4}
                zIndex="sticky"
            >
                <Container>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Box>
                            <Text fontSize={'large'}>Now Playing</Text>
                            <Text>{currentStation.display_name}</Text>
                        </Box>

                        <IconButton
                            aria-label="Play pause button"
                            icon={isPlaying ? <FaPause /> : <FaPlay />}
                            onClick={handlePlayPause}
                        />
                    </Stack>
                </Container>
            </Box>

            <Box hidden>
                <video
                    ref={videoRef}
                    src={currentStation.stream_url}
                    // type="application/x-mpegURL"
                    controls={isLargerThan768}
                    style={{ width: '100%', height: 'auto' }}
                />
            </Box>
        </>
    )
}
