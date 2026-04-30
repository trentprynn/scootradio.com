import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

export default [
    ...nextCoreWebVitals,
    {
        rules: {
            'react/no-unescaped-entities': 'off',
            '@next/next/no-img-element': 'off',
        },
    },
]
