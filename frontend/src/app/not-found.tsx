'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function NotFoundRedirect({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { push } = useRouter()

    const [redirected, setRedirected] = useState(false)

    const redirectedRootOnce = useRef(false)
    useEffect(() => {
        // the purpose of this effect is to the redirect the user to
        // the root page of the application instead of rendering a 404 page

        if (redirectedRootOnce.current) {
            return
        }

        const redirectRoot = async () => {
            push('/')
            setRedirected(true)
        }

        redirectedRootOnce.current = true
        redirectRoot()
    }, [push])

    if (!redirected) {
        return null
    }

    return children
}
