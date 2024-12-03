'use client'

import { useRouter } from 'next/navigation'
import { useEffectOnce } from 'react-use'

export default function NotFoundRedirect({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { replace } = useRouter()

    useEffectOnce(() => {
        // the purpose of this effect is to redirect the user to
        // the root page of the application instead of rendering a 404 page
        replace('/')
    })

    return children
}
