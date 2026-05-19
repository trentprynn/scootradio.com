export const LOUD_ZOD_FAILURE_ENABLED = process.env.NEXT_PUBLIC_ZOD_LOUD_FAIL_ENABLED === 'true'

export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL ?? 'https://scootradio.com').replace(/\/$/, '')
