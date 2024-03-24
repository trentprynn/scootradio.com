import { Container } from '@chakra-ui/react'

export function StandardPageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <Container mt={4} mb={4}>
                {children}
            </Container>
        </main>
    )
}
