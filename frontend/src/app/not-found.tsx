'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function NotFoundRedirect({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { replace } = useRouter()

    const [redirected, setRedirected] = useState(false)

    const redirectedRootOnce = useRef(false)
    useEffect(() => {
        // the purpose of this effect is to the redirect the user to
        // the root page of the application instead of rendering a 404 page

        if (redirectedRootOnce.current) {
            return
        }

        const redirectRoot = async () => {
            replace('/')
            setRedirected(true)
        }

        redirectedRootOnce.current = true
        redirectRoot()
    }, [replace])

    if (!redirected) {
        return null
    }

    return children
}
