import { ReactQueryProvider } from './react-query-provider'

export function Providers({ children }: { children: React.ReactNode }) {
    return <ReactQueryProvider>{children}</ReactQueryProvider>
}
