import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from '@chakra-ui/react'

export function PaddedErrorMessageDisplay({ title, description }: { title: string; description?: string }) {
    return (
        <Box sx={{ p: 2 }}>
            <Alert status="error">
                <AlertIcon />
                <AlertTitle>{title}</AlertTitle>
                {description && <AlertDescription>{description}</AlertDescription>}
            </Alert>
        </Box>
    )
}
