'use client'

import { reactQueryClient } from '@/config/react-query-instance'
import { QueryClientProvider } from '@tanstack/react-query'

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={reactQueryClient}>{children}</QueryClientProvider>
}
