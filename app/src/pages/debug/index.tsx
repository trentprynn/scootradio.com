import Layout from '@/components/layout/layout'
import useHealth from '@/data/health/use-health'
import useEphemeralLocalSettings from '@/data/state/local/settings/use-local-settings'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Box, Container, Typography } from '@mui/material'
import Grid from '@mui/system/Unstable_Grid'
import { useEffect } from 'react'

export default function Debug() {
    const { localSettings } = useEphemeralLocalSettings()

    const { user } = useUser()

    const { healthData, healthDataFetchError } = useHealth()

    useEffect(() => {
        console.log('LOCAL SETTINGS CHANGE')
        console.log(localSettings)
    }, [localSettings])

    return (
        <Layout title="Debug">
            <Container>
                <Grid container spacing={2} justifyContent="center">
                    <Grid xs={12} lg={9}>
                        <Box
                            sx={{
                                color: 'black',
                                background: 'pink',
                                padding: '2em',
                            }}
                        >
                            <pre>{JSON.stringify(localSettings, null, '\t')}</pre>
                        </Box>
                    </Grid>
                    <Grid xs={12} lg={3}>
                        <Box
                            sx={{
                                color: 'black',
                                background: 'lightgreen',
                                padding: '2em',
                            }}
                        >
                            <>
                                <Typography variant="h6" align="center">
                                    API Health
                                </Typography>

                                {healthData && <Typography align="center">status: {healthData.status}</Typography>}

                                {healthDataFetchError && (
                                    <Typography align="center">error: {`${healthDataFetchError}`}</Typography>
                                )}
                            </>
                        </Box>
                    </Grid>
                    {user && (
                        <Grid xs={12} sx={{ overflowX: 'hidden' }}>
                            <Box
                                sx={{
                                    color: 'black',
                                    background: 'aliceblue',
                                    padding: '2em',
                                    overflow: 'hidden',
                                }}
                            >
                                <pre>{JSON.stringify(user, null, '\t')}</pre>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Layout>
    )
}
