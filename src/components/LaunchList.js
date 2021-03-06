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
import { Button } from '@mui/material';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';



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
            setLogError("")
        }
    }

    //listen to scroll event to show back to top icon
    const [showButton, setShowButton] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smoothly scrolling
        });
    };

    // function to change the value of xs atribute in Grid based on screen width
    //it rerenders to many times and slows down the app

    // const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    // const [size, setSize] = useState(6)
    // useEffect(() => {
    //     console.log("bla")
    //     const handleResize = () => {
    //         setScreenWidth(window.innerWidth)
    //         if (screenWidth > 660) {
    //             setSize(6)
    //         } else {
    //             setSize(12)
    //         }
    //     }
    //     window.addEventListener('resize', handleResize)
    //     return () => {
    //         window.removeEventListener('resize', handleResize)
    //     }
    // }, [screenWidth])

    return (
        <>
            <Container >
                <InputField
                    type="text"
                    value={filterInput}
                    placeholder="Enter year:"
                    onChange={handleSearch} />

                <div className="profile-info">
                    <div className="user-name" >
                        {currentUser && (<Link className="user-name" to='/profile'>Hello, <span className="tracking-in-expand">{currentUser.email}</span>  !</Link>)}
                    </div>
                    <div >
                        {currentUser && <Button
                            sx={{ color: 'rgb(255, 255, 255, 0.9)' }}
                            size="small"
                            variant="text"
                            onClick={handleLogout}> <LogoutTwoToneIcon></LogoutTwoToneIcon> Logout</Button>}
                    </div >
                    {!currentUser && <div className="user-name" >
                        <Link className="user-name" to="/signup">Sign Up </Link>
                         or
                        <Link className="user-name" to="/login"> Login</Link>
                    </div>}
                </div>


                {error && <div>{error}</div>}
                {isPending && <div className="loadingio-spinner-eclipse-jc8w54eaf9"><div className="ldio-6zclm0831oa"><div></div> </div></div>}


                <Grid container spacing={4}>
                    {showData && showData.map((launch) => {
                        return (<Grid key={launch.mission_name} item xs={12} s={6} md={4} lg={4}>
                            <NoteCard launch={launch}  ></NoteCard>
                            <div ref={lastLaunch}></div>
                        </Grid>)
                    })}
                </Grid>
            </Container >

            {showButton && (
                <button title="back to top" onClick={scrollToTop} className="back-to-top">
                    &#128640;
                </button>
            )}

        </>
    );
}

export default LaunchList;