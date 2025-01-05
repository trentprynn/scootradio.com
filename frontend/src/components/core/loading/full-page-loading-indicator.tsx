'use client'

export function FullPageLoadingIndicator() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center space-y-2 text-gray-600 dark:text-gray-300">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-current border-t-transparent" />
                <p className="text-sm">Loading...</p>
            </div>
        </div>
    )
}
