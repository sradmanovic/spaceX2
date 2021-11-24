import { useState, useRef } from 'react';
import useFetch from '../customHooks/useFetch';
import NoteCard from '../components/NoteCard'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import useIntersection from '../customHooks/useIntersection';

const LaunchList = () => {

    const [flight_year, setFlight_year] = useState("");
    const [limit, setLimit] = useState(20)
    const [offset, setOffset] = useState(1)

    const { error, isPending, data: launches, hasMore } = useFetch(`${process.env.REACT_APP_BASE_URL}?limit=${limit}&offset=${offset}&filter&launch_year=${flight_year}`);

    const handleSearch = (e) => {
        setFlight_year(e.target.value)
        setLimit(5)
        setOffset(0)

    }

    const observerDiv = useRef();
    const { lastLaunch } = useIntersection(observerDiv, hasMore, setLimit, isPending)

    return (
        < div className="home" >
            <div className="search-params">
                <form>
                    <label htmlFor="flight_year">
                        <input type="text" id="flight_year" value={flight_year} placeholder="Enter year: " onChange={handleSearch} />
                    </label>
                </form>
            </div>
            { error && <div>{error}</div>}
            { isPending && <div className="loading">Loading...</div>}
            <Container >
                <Grid container spacing={10}>
                    {launches && launches.map((launch, index) => {
                        return (launches.length === index + 1) ?
                            (<Grid item xs={12} md={6} lg={4}>
                                <NoteCard key={launch.flight_number} launch={launch}></NoteCard>
                                <div className="loading" ref={lastLaunch}></div>
                            </Grid>)
                            :
                            (<Grid item xs={12} md={6} lg={4}>
                                <NoteCard key={launch.flight_number} launch={launch}></NoteCard>
                            </Grid>)
                    })}
                </Grid>
            </Container >
        </div >
    );
}

export default LaunchList;