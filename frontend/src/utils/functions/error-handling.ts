import { AxiosError } from 'axios'
import { ZodError } from 'zod'

export const getErrorMessage = (error: ZodError | AxiosError | string | any): string => {
    try {
        if (error instanceof ZodError) {
            return `The response from the server was invalid.`
        }

        if (error instanceof AxiosError) {
            if (error.response) {
                if (error.response.data.message && typeof error.response.data.message === 'string') {
                    return error.response.data.message
                }
            }

            if (error.request) {
                return 'The request was made but no response was received.'
            }

            if (error.message && typeof error.message === 'string') {
                return error.message
            }
        }
    } catch (e) {
        // NO-OP
    }

    return 'An error occurred. Please try again later.'
}
