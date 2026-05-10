import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
    ...nextCoreWebVitals,
    {
        rules: {
            'react/no-unescaped-entities': 'off',
            '@next/next/no-img-element': 'off',
        },
    },
])
