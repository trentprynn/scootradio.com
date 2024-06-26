import { NavBar } from '@/components/core/layout/nav-bar'
import { Providers } from '@/components/core/providers/providers'
import { StationPlayer } from '@/components/radio-station/station-player/station-player'
import { Box, Spacer } from '@chakra-ui/react'
import type { Metadata } from 'next'

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
                    <Box display={'flex'} flexDir={'column'} height={'100dvh'}>
                        <NavBar />
                        {children}
                        <Spacer />
                        <StationPlayer />
                    </Box>
                </Providers>
            </body>
            {process.env.NODE_ENV === 'production' && (
                <script async defer data-collect-dnt="true" src="https://sa.scootradio.com/latest.js"></script>
            )}
        </html>
    )
}
