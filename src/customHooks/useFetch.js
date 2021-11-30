import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(false)


    useEffect(() => {

        const abortCont = new AbortController();

        (async function fetchData() {

            try {
                const response = await fetch(url, {
                    signal: abortCont.signal
                })

                if (!response.ok) { // error coming back from server
                    throw Error('could not fetch the data for that resource');
                }

                const data = await response.json()
                setIsPending(false);
                setData(data);
                setError(null);
                setHasMore(data.length > 0)

            } catch (err) {

                if (err.name === "AbortError") {
                    console.log('fetch aborted')
                } else {
                    // auto catches network / connection error
                    setIsPending(false);
                    setError(err.message);
                }
            }

        })()

        return () => abortCont.abort();

    }, [url])

    return { data, isPending, error, hasMore };
}

export default useFetch;