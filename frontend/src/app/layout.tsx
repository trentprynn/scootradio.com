import { NavBar } from '@/components/core/layout/nav-bar'
import { Providers } from '@/components/core/providers/providers'
import { CurrentlyPlayingBox } from '@/components/radio-station/currently-playing/currently-playing-box'
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
                    <NavBar />
                    {children}
                    <CurrentlyPlayingBox />
                </Providers>
            </body>
        </html>
    )
}
