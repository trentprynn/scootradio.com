import { FetchError } from '@/api/fetch-error.type'
import { ZodError } from 'zod'

export interface DisplayError {
    title: string
    message?: string
}

export const getErrorMessage = (error: ZodError | FetchError | string | unknown): DisplayError => {
    try {
        if (error instanceof ZodError) {
            return {
                title: `The response from the server was invalid.`,
                message: error.message
            }
        }

        if (error instanceof FetchError) {
            if (typeof error.body === 'object' && error.body !== null) {
                const maybeMessage = (error.body as { message?: unknown }).message
                if (typeof maybeMessage === 'string') {
                    return {
                        title: error.message,
                        message: maybeMessage,
                    }
                }
            }

            return {
                title: error.message,
                message: `URL: ${error.url}, Status: ${error.status}`,
            }
        }

        if (error instanceof Error) {
            return {
                title: 'An error occurred.',
                message: error.message,
            }
        }
    } catch (e) {
        // NO-OP
    }

    return {
        title: 'An error occurred.',
        message: 'Please try again later.',
    }
}
