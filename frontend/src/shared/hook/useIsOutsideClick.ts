import * as React from 'react'

export function useIsOutsideClick<T extends HTMLElement>(refNode: React.MutableRefObject<T >) {
    const [isOutside, setIsOutside] = React.useState(false)
    
    const handler = React.useCallback((e: MouseEvent) => {
        if (refNode.current && !(refNode.current).contains(e.target as Node)) {
            setIsOutside(true)
        }
    }, [refNode])

    const startListen = React.useCallback(() => {
        document.body.addEventListener('click', handler)
    }, [handler])

    const stopListen = React.useCallback(() => {
        setIsOutside(false)
        document.body.removeEventListener('click', handler)
    }, [handler, setIsOutside])

    return { isOutside, startListen, stopListen}
}