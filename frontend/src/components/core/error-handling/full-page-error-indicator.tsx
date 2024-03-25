import { Container } from '@chakra-ui/react'
import { StandardPageWrapper } from '../layout/standard-page-wrapper'
import { PaddedErrorMessageDisplay, PaddedErrorMessageDisplayProps } from './padded-error-message-display'

export function FullPageErrorIndicator(props: PaddedErrorMessageDisplayProps) {
    return (
        <StandardPageWrapper>
            <Container>
                <PaddedErrorMessageDisplay {...props} />
            </Container>
        </StandardPageWrapper>
    )
}
