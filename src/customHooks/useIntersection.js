import { useCallback } from 'react'

const useIntersection = (observer, hasMore, setOffset, isPending, setLimit) => {

    const lastLaunch = useCallback(node => {
        if (isPending) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setLimit(prevLimit => prevLimit + 20)

            }
        })
        if (node) observer.current.observe(node)
    }, [isPending, hasMore, observer, setLimit])

    return { lastLaunch }

}

export default useIntersection;