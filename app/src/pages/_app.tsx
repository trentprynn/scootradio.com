import '@/styles/global.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

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

    const onRedirectCallback = (appState: any) => {
        if (window && window.location !== appState?.returnTo) {
            window.location = appState?.returnTo
        }
    }

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                refetchOnReconnect: false,
            },
        },
    })

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </Head>
            <Auth0Provider
                domain={`${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}`}
                clientId={`${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}`}
                onRedirectCallback={onRedirectCallback}
                cacheLocation="localstorage"
                authorizationParams={{
                    redirect_uri: typeof window !== 'undefined' ? window.location.origin : undefined,
                    audience: `${process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}`,
                    scope: 'openid profile email offline_access',
                }}
            >
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </QueryClientProvider>
            </Auth0Provider>
        </>
    )
}
