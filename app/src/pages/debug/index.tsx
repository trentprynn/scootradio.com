import Layout from '@/components/layout/layout'
import { useHealth } from '@/state/external/use-health'
import { useNewLocalSettings } from '@/state/local/use-new-local-settings'
import { useAuth0 } from '@auth0/auth0-react'
import { Box, Container, Typography } from '@mui/material'
import Grid from '@mui/system/Unstable_Grid'

export default function Debug() {
    const newLocalSettings = useNewLocalSettings((state) => state)

    const { user } = useAuth0()

    const { data, error } = useHealth()

    return (
        <Layout>
            <Container>
                <Grid container spacing={2} justifyContent="center">
                    <Grid xs={12} lg={9}>
                        <Box
                            sx={{
                                color: 'black',
                                background: 'lightblue',
                                padding: '2em',
                            }}
                        >
                            <pre>{JSON.stringify(newLocalSettings, null, '\t')}</pre>
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

                                {data && <Typography align="center">status: {data.status}</Typography>}

                                {error && <Typography align="center">error: {`${error}`}</Typography>}
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
