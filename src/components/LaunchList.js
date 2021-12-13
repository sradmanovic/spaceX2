import { useState, useRef, useEffect } from 'react';
import useFetch from '../customHooks/useFetch';
import NoteCard from '../components/NoteCard'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import useIntersection from '../customHooks/useIntersection';
import useDebounce from '../customHooks/useDebounce';
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from "react-router-dom";
import InputField from './InputField';
import { Box } from '@mui/material';


const LaunchList = () => {

    const [flight_year, setFlight_year] = useState('');
    const [filterInput, setFilterInput] = useState("")
    const [limit] = useState(20)
    const [offset, setOffset] = useState(0)

    const [displayedData, setDisplayedData] = useState([])
    const [filteredData, setFilteredData] = useState([])

    const [logError, setLogError] = useState()
    const { currentUser, logout } = useAuth()

    const history = useHistory()

    // "cache-ing" fetched data when using filter
    const showData = filterInput.length === 4 ? filteredData : displayedData;


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
    //first paramether is a callback function, condition for invoking it is that filterInput value is not an empty string, whick means that it will not call fetch when we erase input value

    useDebounce(() => {
        if (filterInput) {
            setFlight_year(filterInput)
        }
    }, filterInput)

    const handleSearch = (e) => {
        setFilterInput(e.target.value)
    }

    //tracking changes in launches to trigger adding of fetched data (launches) to displayedData array
    //but if there is a value set for flight_year filter input, adding the data into the filteredData array and only there
    //brakes if we try to use infinite scroll on filtered data

    useEffect(() => {
        if (flight_year) {
            setFilteredData(launches)
            return
        }
        if (launches) {
            setDisplayedData(prevData => prevData.concat(launches))
        }
    }, [launches])


    //useIntersection custom hook, ajusting offset when ref div is reached
    const observerDiv = useRef();
    const { lastLaunch } = useIntersection(observerDiv, hasMore, () => { setOffset(prevOffset => prevOffset + 20) }, isPending)


    //firebase logout function invoked using AuthContext
    async function handleLogout() {
        setLogError('')
        try {
            setLogError('')
            await logout()
            history.pushState('/login')
        } catch {
            setLogError("Failed to log out!")
        }
    }

    return (
        <>
            <Box >
                <InputField type="text" value={filterInput} placeholder="Enter year:" onChange={handleSearch} />
            </Box>
            <Container >
                <div className="profile-info">
                    <div className="user-name">
                        {currentUser ? (`User: ${currentUser.email}`) : ("No user signed in")}
                    </div>
                    {logError && <div> {logError} </div>}
                    <div>
                        {currentUser && <button className="logout-button" onClick={handleLogout}>&#x27B2; Logout</button>}
                    </div>
                    <div>
                        <Link to="/signup">Sign Up </Link>
                         or
                        <Link to="/login"> Login</Link>
                    </div>

                </div>
            </Container>
            <Container>
                {error && <div>{error}</div>}
                {isPending && <div className="loadingio-spinner-eclipse-jc8w54eaf9"><div className="ldio-6zclm0831oa"><div></div> </div></div>}
            </Container>
            <Container >
                <Grid container spacing={10}>
                    {showData && showData.map((launch) => {
                        return (<Grid key={launch.mission_name} item xs={12} md={6} lg={4}>
                            <NoteCard launch={launch}  ></NoteCard>
                            <div className="loading" ref={lastLaunch}></div>
                        </Grid>)
                    })}
                </Grid>
            </Container >
        </>
    );
}

export default LaunchList;