import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from '@chakra-ui/react'

export type PaddedErrorMessageDisplayProps = {
    title: string
    description?: string
}

export function PaddedErrorMessageDisplay({ title, description }: PaddedErrorMessageDisplayProps) {
    return (
        <Box sx={{ p: 2 }}>
            <Alert status="error">
                <AlertIcon />
                <Box>
                    <AlertTitle>{title}</AlertTitle>
                    {description && <AlertDescription>{description}</AlertDescription>}
                </Box>
            </Alert>
        </Box>
    )
}
