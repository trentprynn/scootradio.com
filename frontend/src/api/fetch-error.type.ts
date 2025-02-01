export class FetchError extends Error {
    public status?: number
    public url?: string
    public body?: unknown

    constructor(message: string, options?: { status?: number; body?: unknown; url?: string }) {
        super(message)
        this.name = 'FetchError'
        this.status = options?.status
        this.url = options?.url
        this.body = options?.body
    }
}
