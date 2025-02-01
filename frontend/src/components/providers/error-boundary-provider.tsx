'use client'

import { getErrorMessage } from '@/utils/functions/error-handling'
import { ErrorBoundary } from 'react-error-boundary'
import { LargeErrorMessageDisplay } from '../error-handling/large-error-message-display'

function FallbackRenderComponent({ error }: { error?: unknown }) {
    const displayError = getErrorMessage(error)
    return <LargeErrorMessageDisplay displayError={displayError} />
}

export function ErrorBoundaryProvider({ children }: { children: React.ReactNode }) {
    return <ErrorBoundary fallback={<FallbackRenderComponent />}>{children}</ErrorBoundary>
}
