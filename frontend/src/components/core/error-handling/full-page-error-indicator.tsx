import { StandardPageWrapper } from '../layout/standard-page-wrapper'
import { PaddedErrorMessageDisplay, PaddedErrorMessageDisplayProps } from './padded-error-message-display'

export function FullPageErrorIndicator(props: PaddedErrorMessageDisplayProps) {
    return (
        <StandardPageWrapper>
            <PaddedErrorMessageDisplay {...props} />
        </StandardPageWrapper>
    )
}
