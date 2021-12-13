const { useEffect } = require("react")

const useDebounce = (callback, dependency) => {

    useEffect(() => {
        const tmp = setTimeout(() => {
            callback()
        }, 1000)
        return () => clearTimeout(tmp)

    }, [dependency])

}

export default useDebounce;