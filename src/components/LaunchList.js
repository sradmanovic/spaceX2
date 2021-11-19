import { useState, useContext, useRef, useCallback } from 'react';
import useFetch from '../customHooks/useFetch';
import NoteCard from '../components/NoteCard'
import ThemeContext from '../context/ThemeContext';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

const LaunchList = () => {

    const baseUrl = "https://api.spacexdata.com/v3/launches"

    const [theme] = useContext(ThemeContext)

    const [flight_year, setFlight_year] = useState("");
    const [limit, setLimit] = useState(20)
    const [offset, setOffset] = useState(1)

    const { error, isPending, data: launches, hasMore } = useFetch(`${baseUrl}?limit=${limit}&offset=${offset}&filter&launch_year=${flight_year}`);

    const handleSearch = (e) => {
        setFlight_year(e.target.value)
        setLimit(5)
        setOffset(0)

    }

    const observer = useRef();

    const lastLaunch = useCallback(node => {
        if (isPending) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                console.log("Called")
                setLimit(prevLimit => prevLimit + 20)
            }
        })
        if (node) observer.current.observe(node)
    }, [isPending, hasMore])


    return (
        <div className="home">

            <div className="search-params">
                <form>
                    <label htmlFor="flight_year">
                        <input type="text" id="flight_year" value={flight_year} placeholder="Enter year: " style={{ backgroundColor: theme }} onChange={handleSearch} />
                    </label>
                </form>
            </div>

            {error && <div>{error}</div>}
            {isPending && <div className="loading">Loading...</div>}
            <Container >
                <Grid container spacing={10}>
                    {launches && launches.map((launch, index) => {
                        if (launches.length === index + 1) {
                            return (
                                <Grid item xs={12} md={6} lg={4}>
                                    <NoteCard key={launch.flight_number} launch={launch}></NoteCard>
                                    <div className="loading" ref={lastLaunch}></div>
                                </Grid>
                            )
                        } else {
                            return (
                                <Grid item xs={12} md={6} lg={4}>
                                    <NoteCard key={launch.flight_number} launch={launch}></NoteCard>
                                </Grid>
                            )
                        }
                    })}
                </Grid>
            </Container >
        </div>
    );
}

export default LaunchList;