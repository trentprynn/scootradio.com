// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
    initialColorMode: 'system',
    useSystemColorMode: true,
}

// 3. extend the theme
export const theme = extendTheme({ config })
