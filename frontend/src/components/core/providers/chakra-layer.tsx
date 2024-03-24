'use client'

import { theme } from '@/config/theme'
import { ChakraProvider } from '@chakra-ui/react'

export function ChakraLayer({ children }: { children: React.ReactNode }) {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
