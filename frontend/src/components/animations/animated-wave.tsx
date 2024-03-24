import { Box, keyframes } from '@chakra-ui/react'

const waveAnimation = keyframes`
  0%, 100% { height: 5px; }
  50% { height: 20px; } // Reduced height from 50px to 20px
`

const AnimatedWaveBar = ({ delay = '0s' }) => (
    <Box
        as="div"
        w="4px"
        h="5px"
        bg="blue.500"
        mx="2px"
        animation={`${waveAnimation} 1.25s infinite ease-in-out`}
        sx={{ animationDelay: delay, animationDirection: 'alternate' }}
    />
)

export const AnimatedWave = () => (
    <Box display="flex" alignItems="center">
        <AnimatedWaveBar delay="0s" />
        <AnimatedWaveBar delay="0.3s" />
        <AnimatedWaveBar delay="0.6s" />
    </Box>
)
