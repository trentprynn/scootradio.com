import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    typedRoutes: true,
    turbopack: {
        root: process.cwd(),
    },
    async rewrites() {
        if (!process.env.API_PROXY_TARGET) {
            return []
        }

        return [
            {
                source: '/api/:path*',
                destination: `${process.env.API_PROXY_TARGET}/:path*`,
            },
        ]
    },
}

export default nextConfig
