'use client'
import { useAllRadioStations } from '@/api/radio-stations/react-queries/use-all-radio-stations'
import { PaddedErrorMessageDisplay } from '@/components/core/error-handling/padded-error-message-display'
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
    Image,
    Stack,
    Text,
} from '@chakra-ui/react'

export default function Home() {
    const { setCurrentStation } = useRadioPlayerState()

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
            <PaddedErrorMessageDisplay
                title="Failed to load radio stations"
                description={getErrorMessage(radioStationsFetchError)}
            />
        )
    }

    return (
        <StandardPageWrapper>
            <Accordion allowMultiple defaultIndex={[0]}>
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
                            <Stack direction={'row'} spacing={4}>
                                <Image width={100} src={radioStation.image_url} alt={radioStation.display_name} />
                                <Text>{radioStation.description}</Text>
                                <button onClick={() => setCurrentStation(radioStation)}>Play</button>
                            </Stack>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </StandardPageWrapper>
    )
}
