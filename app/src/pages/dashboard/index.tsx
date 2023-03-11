import Layout from '@/components/layout/layout'
import RadioStationBlock from '@/components/radio/radio-station-block.component'
import useRadioStations from '@/data/radio-stations/use-radio-stations'
import useEphemeralLocalSettings from '@/data/state/local/settings/use-local-settings'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { Box, Container, Typography } from '@mui/material'
import Grid from '@mui/system/Unstable_Grid'

export default withPageAuthRequired(function Profile({ user }) {
    const { localSettings } = useEphemeralLocalSettings()

    const { radioStations } = useRadioStations()

    return (
        <Layout title="Dashboard">
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
})
