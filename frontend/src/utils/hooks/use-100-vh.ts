import { debounce } from 'lodash'
import { useLayoutEffect, useState } from 'react'

export const use100vh = () => {
    const [vh100px, setVh100px] = useState(window.innerHeight)

    const handleResize = debounce(() => setVh100px(window.innerHeight), 125)

    useLayoutEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [handleResize])

    return vh100px
}
