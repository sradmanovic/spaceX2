const { useEffect } = require("react")

const useDebounce = (callback, dependency) => {

    useEffect(() => {
        const tmp = setTimeout(() => {
            callback()
        }, 500)
        console.log(tmp)
    }, [dependency])
}

export default useDebounce;