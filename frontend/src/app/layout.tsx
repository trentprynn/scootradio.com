import { NavBar } from '@/components/core/layout/nav-bar'
import { StationPlayer } from '@/components/radio-station/station-player/station-player'
import type { Metadata, Viewport } from 'next'

import { ReactQueryProvider } from '@/components/core/providers/react-query-provider'
import './global.css'

import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
    title: 'scootradio.com',
    description: 'ScootRadio is an ad-free way to listen to curated public radio stations.',
    openGraph: {
        title: 'ScootRadio',
        images: [
            {
                url: 'https://scootradio.com/logo.png',
            },
        ],
        description: 'ScootRadio is an ad-free way to listen to curated public radio stations.',
    },
    manifest: 'https://scootradio.com/manifest.json',
    icons: {
        apple: 'https://scootradio.com/logo192.png',
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
                <ThemeProvider attribute="class">
                    <ReactQueryProvider>
                        <NavBar />
                        {children}
                        <StationPlayer />
                    </ReactQueryProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
