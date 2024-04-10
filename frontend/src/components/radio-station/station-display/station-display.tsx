'use client'

import { RadioStation } from '@/api/radio-stations/types/radio-station.type'
import { AnimatedWave } from '@/components/animations/animated-wave'
import { useRadioPlayerState } from '@/global-state/radio-player-state'
import { Box, Button, Divider, Flex, Image, Spacer, Text } from '@chakra-ui/react'

type StationDisplayProps = {
    radioStation: RadioStation
}

export function StationDisplay({ radioStation }: StationDisplayProps) {
    const { currentStation, setIsPlaying, playStation, isPlaying } = useRadioPlayerState()

    return (
        <Box>
            <Flex gap={2} alignItems={'center'}>
                <Text fontSize="xl">{radioStation.display_name}</Text>
                <Spacer />
                <Image width={100} src={radioStation.image_url} alt={radioStation.display_name} />
            </Flex>

            <Flex mt={4} gap={2} minHeight={'60px'} alignItems={'center'}>
                <Text fontSize={'sm'}>{radioStation.description}</Text>

                <Spacer />

                <Box
                    display={'flex'}
                    flexDir={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={{ minHeight: '100%', width: '70px' }}
                >
                    {currentStation?.name === radioStation.name && isPlaying ? (
                        <AnimatedWave />
                    ) : (
                        <Button
                            onClick={() => {
                                if (!currentStation || currentStation.name !== radioStation.name) {
                                    playStation(radioStation)
                                    return
                                }

                                if (currentStation.name === radioStation.name && !isPlaying) {
                                    setIsPlaying(true)
                                }
                            }}
                        >
                            Play
                        </Button>
                    )}
                </Box>
            </Flex>

            <Divider mt={2} />
        </Box>
    )
}
