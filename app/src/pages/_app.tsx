import { axiosFetcher } from '@/data/axios-config'
import '@/styles/global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { SWRConfig } from 'swr'

export default function MyApp({ Component, pageProps }: AppProps) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode]
    )

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </Head>
            <UserProvider>
                <SWRConfig
                    value={{
                        fetcher: axiosFetcher,
                    }}
                >
                    <ThemeProvider theme={theme}>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </SWRConfig>
            </UserProvider>
        </>
    )
}
