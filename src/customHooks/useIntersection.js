import { useCallback } from 'react'

const useIntersection = (observer, hasMore, setOffset, isPending) => {

    const lastLaunch = useCallback(node => {
        if (isPending) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setOffset(prevLimit => prevLimit + 20)
                console.log("fetched")
            }
        })
        if (node) observer.current.observe(node)
    }, [isPending, hasMore, observer, setOffset])

    return { lastLaunch }

}

export default useIntersection;