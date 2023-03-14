import Layout from '@/components/layout/layout'
import { useAuth0 } from '@auth0/auth0-react'
import { Box, Button, Container, Typography } from '@mui/material'
import Grid from '@mui/system/Unstable_Grid'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Root() {
    const router = useRouter()

    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

    // if logged in, redirect to the dashboard
    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/dashboard')
        }
    }, [isAuthenticated, router])

    return (
        <Layout>
            <Container>
                <Grid container spacing={2} justifyContent="center">
                    <Grid xs={12}>
                        <Box>
                            {!isAuthenticated && !isLoading && (
                                <>
                                    <Typography variant="h2" align="center">
                                        Scoot Radio
                                    </Typography>
                                    <Grid container justifyContent="center" sx={{ marginTop: 5 }}>
                                        <Grid xs="auto">
                                            <Button
                                                variant="contained"
                                                type="button"
                                                onClick={() => loginWithRedirect()}
                                            >
                                                Login
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}
