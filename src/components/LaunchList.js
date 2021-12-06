import { useState, useRef, useEffect } from 'react';
import useFetch from '../customHooks/useFetch';
import NoteCard from '../components/NoteCard'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import useIntersection from '../customHooks/useIntersection';
import useDebounce from '../customHooks/useDebounce';

const LaunchList = () => {

    const [flight_year, setFlight_year] = useState('');
    const [filterInput, setFilterInput] = useState("")
    const [limit, setLimit] = useState(20)
    const [offset, setOffset] = useState(0)


    const [displayedData, setDisplayedData] = useState([])


    const [filteredData, setFilteredData] = useState([])


    const showData = flight_year ? filteredData : displayedData;



    // fetching data with custom hook 
    // passing query via template literal
    // useFetch is called on any url change
    const {
        error,
        isPending,
        data: launches,
        hasMore
    } = useFetch(`${process.env.REACT_APP_BASE_URL}?limit=${limit}&offset=${offset}&filter&launch_year=${flight_year}`);


    //debounce custom hook and event handler for input
    useDebounce(() => { setFlight_year(filterInput) }, filterInput)


    const handleSearch = (e) => {
        setFilterInput(e.target.value)

        setLimit(20)
        // setOffset(0)
    }

    //tracking changes in launches to trigger adding of fetched data (launches) to displayedData array
    useEffect(() => {
        if (launches) {
            setDisplayedData(prevData => prevData.concat(launches))
            console.log(showData)
        }
    }, [launches])

    //tracking changes in input value of filter to list only filtered data
    useEffect(() => {
        console.log(launches)
        setFilteredData(launches)
        // setFilteredData(prevData => prevData.concat(launches))

    }, [flight_year])


    //useIntersection custom hook, ajusting offset when ref div is reached
    const observerDiv = useRef();
    const { lastLaunch } = useIntersection(observerDiv, hasMore, () => { setOffset(prevOffset => prevOffset + 20) }, isPending)



    return (
        < div className="home" >
            <div className=" search-params">
                <form>
                    <label htmlFor="flight_year">
                        <input type="text" id="flight_year" value={filterInput} placeholder="Enter year: " onChange={handleSearch} />
                    </label>
                </form>
            </div>
            { error && <div>{error}</div>}
            { isPending && <div className="loadingio-spinner-eclipse-jc8w54eaf9"><div className="ldio-6zclm0831oa">
                <div></div>
            </div></div>}
            <Container >
                <Grid container spacing={10}>
                    {showData && showData.map((launch) => {
                        return <Grid key={launch.flight_number} item xs={12} md={6} lg={4}>
                            <NoteCard launch={launch}  ></NoteCard>
                            <div className="loading" ref={lastLaunch}></div>
                        </Grid>
                    })}
                </Grid>
            </Container >
        </div >
    );
}

export default LaunchList;