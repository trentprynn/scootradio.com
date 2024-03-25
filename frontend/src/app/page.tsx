'use client'
import { useAllRadioStations } from '@/api/radio-stations/react-queries/use-all-radio-stations'
import { AnimatedWave } from '@/components/animations/animated-wave'
import { FullPageErrorIndicator } from '@/components/core/error-handling/full-page-error-indicator'
import { StandardPageWrapper } from '@/components/core/layout/standard-page-wrapper'
import { FullPageLoadingIndicator } from '@/components/core/loading-indication/full-page-loading-indicator'
import { useRadioPlayerState } from '@/global-state/radio-player-state'
import { getErrorMessage } from '@/utils/functions/error-handling-utils'
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Flex,
    Image,
    Text,
} from '@chakra-ui/react'

export default function Home() {
    const { setCurrentStation, currentStation, isPlaying, setIsPlaying } = useRadioPlayerState()

    const {
        data: radioStations,
        error: radioStationsFetchError,
        isLoading: radioStationsLoadings,
    } = useAllRadioStations()

    if (radioStationsLoadings) {
        return <FullPageLoadingIndicator />
    }

    if (!radioStations) {
        return (
            <FullPageErrorIndicator
                title="Failed to load radio stations"
                description={getErrorMessage(radioStationsFetchError)}
            />
        )
    }

    return (
        <StandardPageWrapper>
            <Accordion allowMultiple defaultIndex={Array.from({ length: radioStations.length }, (_, i) => i)}>
                {radioStations.map((radioStation) => (
                    <AccordionItem key={radioStation.name}>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex="1" textAlign="left">
                                    {radioStation.display_name}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Flex gap={3}>
                                <Box flex="1">
                                    <Image width={100} src={radioStation.image_url} alt={radioStation.display_name} />
                                    <Text mt={2}>{radioStation.description}</Text>
                                </Box>

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
                                                if (!currentStation) {
                                                    setCurrentStation(radioStation)
                                                    return
                                                }

                                                if (currentStation.name === radioStation.name) {
                                                    if (!isPlaying) {
                                                        setIsPlaying(true)
                                                    }
                                                }

                                                if (currentStation.name !== radioStation.name) {
                                                    setCurrentStation(radioStation)
                                                }
                                            }}
                                        >
                                            Play
                                        </Button>
                                    )}
                                </Box>
                            </Flex>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </StandardPageWrapper>
    )
}
