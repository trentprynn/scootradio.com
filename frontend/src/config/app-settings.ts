import { z } from 'zod'

const EnvSchema = z.object({
    NEXT_PUBLIC_API_BASE_URL: z.string().min(1),
    NEXT_PUBLIC_BASE_URL: z.string().min(1),
    NEXT_PUBLIC_ZOD_LOUD_FAIL_ENABLED: z.enum(['true', 'false']).optional(),
})

const env = EnvSchema.parse({
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_ZOD_LOUD_FAIL_ENABLED: process.env.NEXT_PUBLIC_ZOD_LOUD_FAIL_ENABLED,
})

export const LOUD_ZOD_FAILURE_ENABLED = env.NEXT_PUBLIC_ZOD_LOUD_FAIL_ENABLED === 'true'
export const SITE_URL = env.NEXT_PUBLIC_BASE_URL
export const API_BASE_URL = env.NEXT_PUBLIC_API_BASE_URL
