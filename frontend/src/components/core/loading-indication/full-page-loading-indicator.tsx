import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { StandardPageWrapper } from '../layout/standard-page-wrapper'

export function FullPageLoadingIndicator() {
    return (
        <StandardPageWrapper>
            <Box padding="6" boxShadow="lg" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={4} spacing="4" />
            </Box>
        </StandardPageWrapper>
    )
}
