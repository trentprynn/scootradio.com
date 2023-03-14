import Layout from '@/components/layout/layout'
import RadioStationBlock from '@/components/radio/radio-station-block.component'
import { useRadioStations } from '@/state/external/use-radio-stations'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { Box, Container, Typography } from '@mui/material'
import Grid from '@mui/system/Unstable_Grid'

const Dashboard = () => {
    const { getAccessTokenSilently } = useAuth0()

    const { data: radioStations } = useRadioStations(getAccessTokenSilently)

    return (
        <Layout>
            <Container>
                <Grid container spacing={2} justifyContent="center">
                    <Grid xs={12} lg={9}>
                        <Box>
                            <Typography variant="h4" align="center">
                                ScootRadio.com
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid container xs={12} lg={9} justifyContent="center">
                        {radioStations &&
                            radioStations.length > 0 &&
                            radioStations.map((radioStation) => (
                                <Grid xs="auto" key={radioStation.name}>
                                    <RadioStationBlock
                                        station={radioStation}
                                        key={radioStation.name}
                                    ></RadioStationBlock>
                                </Grid>
                            ))}
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default withAuthenticationRequired(Dashboard)
