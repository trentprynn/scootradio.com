'use client'

import { use100vh } from '@/utils/hooks/use-100-vh'
import { Box } from '@chakra-ui/react'

export function VH100Box({ children }: { children: React.ReactNode }) {
    const vh100px = use100vh()

    return (
        <Box
            sx={{
                height: `${vh100px}px`,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {children}
        </Box>
    )
}
