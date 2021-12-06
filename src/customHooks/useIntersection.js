import { useCallback } from 'react'

const useIntersection = (observer, hasMore, callback, isPending) => {

    const lastLaunch = useCallback(node => {
        if (isPending) return

        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                callback()
            }
        })
        if (node) observer.current.observe(node)
    }, [isPending, hasMore, observer, callback])

    return { lastLaunch }

}

export default useIntersection;