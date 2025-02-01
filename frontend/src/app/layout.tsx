import { RadioStationPlayer } from '@/components/radio-station/radio-station-player/radio-station-player'
import type { Metadata, Viewport } from 'next'

import { ReactQueryProvider } from '@/components/providers/react-query-provider'
import './global.css'

import { NavBar } from '@/components/layout/nav-bar/nav-bar'
import { ErrorBoundaryProvider } from '@/components/providers/error-boundary-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'

export const metadata: Metadata = {
    title: 'scootradio.com',
    description: 'ScootRadio is an ad-free way to listen to curated public radio stations.',
    openGraph: {
        title: 'ScootRadio',
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
            },
        ],
        description: 'ScootRadio is an ad-free way to listen to curated public radio stations.',
    },
    manifest: `${process.env.NEXT_PUBLIC_BASE_URL}/manifest.json`,
    icons: {
        apple: `${process.env.NEXT_PUBLIC_BASE_URL}/logo192.png`,
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="dark:input-slate-200 bg-white text-slate-500 antialiased dark:bg-slate-900 dark:text-slate-400">
                <ThemeProvider>
                    <ReactQueryProvider>
                        <NavBar />
                        <ErrorBoundaryProvider>{children}</ErrorBoundaryProvider>
                        <RadioStationPlayer />
                    </ReactQueryProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
