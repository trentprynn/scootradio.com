'use client'

import { debounce } from 'lodash'
import { useLayoutEffect, useState } from 'react'

export const use100vh = () => {
    const [vh100px, setVh100px] = useState(0)

    const handleResize = debounce(() => {
        if (typeof window !== 'undefined') {
            setVh100px(window.innerHeight)
        }
    }, 5)

    useLayoutEffect(() => {
        if (typeof window !== 'undefined') {
            setVh100px(window.innerHeight)
            window.addEventListener('resize', handleResize)

            return () => {
                window.removeEventListener('resize', handleResize)
            }
        }
    }, [handleResize])

    return vh100px
}
