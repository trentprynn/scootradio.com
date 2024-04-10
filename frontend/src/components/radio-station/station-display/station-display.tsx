'use client'

import { RadioStation } from '@/api/radio-stations/types/radio-station.type'
import { AnimatedWave } from '@/components/animations/animated-wave'
import { useFavoriteStationsState } from '@/global-state/favorite-stations-state'
import { useRadioPlayerState } from '@/global-state/radio-player-state'
import { Box, Button, Divider, Flex, HStack, IconButton, Image, Spacer, Text, Tooltip } from '@chakra-ui/react'
import { FaRegStar, FaStar } from 'react-icons/fa6'

type StationDisplayProps = {
    radioStation: RadioStation
}

export function StationDisplay({ radioStation }: StationDisplayProps) {
    const { currentStation, setIsPlaying, playStation, isPlaying } = useRadioPlayerState()

    const { favoriteStationNames, addFavoriteStation, removeFavoriteStation } = useFavoriteStationsState()

    return (
        <Box>
            <Flex gap={2} alignItems={'center'}>
                <HStack spacing={4}>
                    <Text fontSize="xl">{radioStation.display_name}</Text>
                    {favoriteStationNames.includes(radioStation.name) ? (
                        <Tooltip aria-label={`Remove ${radioStation.display_name} from favorite stations`}>
                            <IconButton
                                variant={'text'}
                                size={'small'}
                                aria-label={`Remove ${radioStation.display_name} from favorite stations`}
                                icon={<FaStar />}
                                onClick={() => {
                                    removeFavoriteStation(radioStation.name)
                                }}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip aria-label={`Add ${radioStation.display_name} as a favorite station`}>
                            <IconButton
                                variant={'text'}
                                size={'small'}
                                aria-label={`Add ${radioStation.display_name} as a favorite station`}
                                icon={<FaRegStar />}
                                onClick={() => {
                                    addFavoriteStation(radioStation.name)
                                }}
                            />
                        </Tooltip>
                    )}
                </HStack>

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
