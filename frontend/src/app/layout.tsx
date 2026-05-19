import { RadioStationPlayer } from '@/components/radio-station/radio-station-player/radio-station-player'
import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata, Viewport } from 'next'

import { ReactQueryProvider } from '@/components/providers/react-query-provider'
import './global.css'

import { NavBar } from '@/components/layout/nav-bar/nav-bar'
import { ErrorBoundaryProvider } from '@/components/providers/error-boundary-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { SITE_URL } from '@/config/app-settings'

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: 'scootradio.com',
    description: 'ScootRadio is an ad-free way to listen to curated public radio stations.',
    openGraph: {
        title: 'ScootRadio',
        images: [
            {
                url: `${SITE_URL}/logo.png`,
            },
        ],
        description: 'ScootRadio is an ad-free way to listen to curated public radio stations.',
    },
    manifest: `${SITE_URL}/manifest.webmanifest`,
    icons: {
        apple: `${SITE_URL}/logo192.png`,
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
            {process.env.NODE_ENV === 'production' ? <GoogleAnalytics gaId="G-WM49FD8FC4" /> : null}
        </html>
    )
}
