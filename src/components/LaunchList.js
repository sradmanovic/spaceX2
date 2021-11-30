import { useState, useRef, useEffect } from 'react';
import useFetch from '../customHooks/useFetch';
import NoteCard from '../components/NoteCard'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import useIntersection from '../customHooks/useIntersection';
import { SpinnerComponent } from 'react-element-spinner';

const LaunchList = () => {

    const [flight_year, setFlight_year] = useState("");
    const [limit, setLimit] = useState(20)
    const [offset, setOffset] = useState(0)

    const { error, isPending, data: launches, hasMore } = useFetch(`${process.env.REACT_APP_BASE_URL}?limit=${limit}&offset=${offset}&filter&launch_year=${flight_year}`);

    const [displayedData, setDisplayedData] = useState()

    useEffect(() => {
        console.log("offset changed " + offset)
        if (launches && offset > 0) {
            setDisplayedData(displayedData.concat(launches))
        }
    }, [offset])

    useEffect(() => {
        console.log("launches changed " + launches)
        setDisplayedData(launches)
    }, [launches])

    const handleSearch = (e) => {
        setFlight_year(e.target.value)
        setLimit(5)
        setOffset(0)
    }

    const observerDiv = useRef();
    const { lastLaunch } = useIntersection(observerDiv, hasMore, setOffset, isPending, setDisplayedData)

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
            { isPending && <div className="loading"><SpinnerComponent loading={isPending} position="global" /></div>}
            <Container >
                <Grid container spacing={10}>
                    {displayedData && !isPending && displayedData.map((launch, index) => {
                        return (displayedData.length === index + 1) ?
                            (<Grid key={launch.flight_number} item xs={12} md={6} lg={4}>
                                <NoteCard launch={launch} ></NoteCard>

                                <div className="loading" ref={lastLaunch}>                                <SpinnerComponent loading={isPending} position="centered" /></div>

                            </Grid>)
                            :
                            (<Grid key={launch.flight_number} item xs={12} md={6} lg={4}>
                                <NoteCard launch={launch}></NoteCard>

                            </Grid>)



                    })}
                </Grid>
            </Container >

        </div >
    );
}

export default LaunchList;