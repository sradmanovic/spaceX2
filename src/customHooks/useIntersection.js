import { useCallback } from 'react'

const useIntersection = (observer, hasMore, setLimit, isPending) => {

    const lastLaunch = useCallback(node => {
        if (isPending) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setLimit(prevLimit => prevLimit + 20)
            }
        })
        if (node) observer.current.observe(node)
    }, [isPending, hasMore, setLimit, observer])

    return { lastLaunch }

}

export default useIntersection;