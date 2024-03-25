import { VH100Box } from '@/components/core/layout/vh-100-box'
import { NavBar } from '@/components/core/layout/nav-bar'
import { Providers } from '@/components/core/providers/providers'
import { CurrentlyPlayingBox } from '@/components/radio-station/currently-playing/currently-playing-box'
import { Spacer } from '@chakra-ui/react'
import type { Metadata } from 'next'
import Script from 'next/script'

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Providers>
                    <VH100Box>
                        <NavBar />
                        {children}
                        <Spacer />
                        <CurrentlyPlayingBox />
                    </VH100Box>
                </Providers>
            </body>
            {process.env.NODE_ENV === 'production' && (
                <Script async defer data-collect-dnt="true" src="https://sa.scootradio.com/latest.js" />
            )}
        </html>
    )
}
