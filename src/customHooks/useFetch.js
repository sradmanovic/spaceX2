import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {

        const abortCont = new AbortController();

        fetch(url, {
            aignal: abortCont.signal
        })
            .then(res => {
                if (!res.ok) { // error coming back from server
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setIsPending(false);
                setData(data);
                setError(null);
                setHasMore(data.length > 0)
            })
            .catch(err => {
                if (err.name === "AbortError") {
                    console.log('fetch aborted')
                } else {
                    // auto catches network / connection error
                    setIsPending(false);
                    setError(err.message);
                }
            })
        return () => abortCont.abort();

    }, [url])

    return { data, isPending, error, hasMore };
}

export default useFetch;