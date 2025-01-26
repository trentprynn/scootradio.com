import { useMemo } from 'react'

export function useIsIOS() {
    return useMemo(() => {
        // Simple user agent check for iOS devices
        return /iPhone|iPad|iPod/i.test(navigator.userAgent)
    }, [])
}
