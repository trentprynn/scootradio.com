import Layout from '@/components/layout/layout'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Box, Button, Container, Typography } from '@mui/material'
import Grid from '@mui/system/Unstable_Grid'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Root() {
    const router = useRouter()

    const { user, isLoading } = useUser()

    // if logged in, redirect to the dashboard
    useEffect(() => {
        if (user) {
            router.replace('/dashboard')
        }
    }, [user, router])

    return (
        <Layout>
            <Container>
                <Grid container spacing={2} justifyContent="center">
                    <Grid xs={12}>
                        <Box>
                            {!user && !isLoading && (
                                <>
                                    <Typography variant="h2" align="center">
                                        Scoot Radio
                                    </Typography>
                                    <Grid container justifyContent="center" sx={{ marginTop: 5 }}>
                                        <Grid xs="auto">
                                            <Button variant="contained" href="/api/auth/login">
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
