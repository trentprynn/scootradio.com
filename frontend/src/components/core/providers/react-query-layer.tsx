'use client'

import { reactQueryClient } from '@/config/react-query-instance'
import { QueryClientProvider } from 'react-query'

export function ReactQueryLayer({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={reactQueryClient}>{children}</QueryClientProvider>
}
