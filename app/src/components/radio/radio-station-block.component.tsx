import { RadioStation } from '@/types/radio/radio-station.type'
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useState } from 'react'
import ReactHlsPlayer from '../hls-player/hls-player'

const RadioStationBlock = ({ station }: { station: RadioStation }) => {
    const playerRef: React.RefObject<HTMLVideoElement> | undefined = React.useRef<any>()

    function adjustVolumeLower() {
        if (playerRef && playerRef.current) {
            playerRef.current.volume = 0.08
        }
    }

    const [activated, setActivated] = useState(false)

    return (
        <Card sx={{ display: 'flex', padding: '1em', width: '200px', height: '275px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box></Box>
                <CardMedia component="img" image={station.imgUrl} alt={`${station.name} cover image`} />
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5" align="center">
                        {station.name}
                    </Typography>
                </CardContent>

                {!activated && <Button onClick={() => setActivated(!activated)}>Play</Button>}

                {activated && (
                    <>
                        <ReactHlsPlayer
                            playerRef={playerRef}
                            src={station.url}
                            autoPlay={true}
                            controls={true}
                            playsInline
                            width="100%"
                            onLoadedData={() => adjustVolumeLower()}
                        />

                        <Button onClick={() => setActivated(!activated)}>Stop</Button>
                    </>
                )}
            </Box>
        </Card>
    )
}

export default RadioStationBlock
