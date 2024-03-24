'use client'
import { ChakraLayer } from './chakra-layer'
import { ReactQueryLayer } from './react-query-layer'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryLayer>
            <ChakraLayer>{children}</ChakraLayer>
        </ReactQueryLayer>
    )
}
