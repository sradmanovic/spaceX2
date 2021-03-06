import { useParams } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import { useHistory } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container } from "@mui/material";



const LaunchDetails = () => {

    //fetching single launch data with id from params
    const { id } = useParams();
    const { data: launch, error, isPending } = useFetch(process.env.REACT_APP_BASE_URL + id);


    //theme context
    const { isDarkTheme, light, dark } = useContext(ThemeContext)
    const theme = isDarkTheme ? dark : light

    //back button
    const history = useHistory()
    const handleClick = () => {
        history.goBack();
    }

    //date string
    function formatDate(string) {
        const dateArray = string.slice(0, 10).split("-");
        return `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`
    }

    const [currentImage, setCurrentImage] = useState("")


    // function handleImgClick(index) {
    //     setCurrentIndex(index)
    // }

    function handleImgClick(e) {
        setCurrentImage(e.target.src)

    }
    return (
        <>
            <Container className="slide-in-elliptic-top-fwd">
                <div className="back-btn-container ">
                    <button style={{ color: theme.text }} onClick={handleClick} className="back-btn details">
                        {" "}
          &#x3c; Back{" "}
                    </button>
                </div>
                {isPending && (
                    <div className="loadingio-spinner-eclipse-jc8w54eaf9">
                        <div className="ldio-6zclm0831oa">
                            <div></div>
                        </div>
                    </div>
                )}
                {error && <div> {error} </div>}
                {launch && (
                    <Box
                        sx={{
                            backgroundColor: theme.bg,
                            borderRadius: "20px",
                            border: "3px ridge rgb(255, 255, 255, 0.2)",
                            color: theme.text,
                        }} >
                        <div className="details-box">
                            <div className="mission-image">
                                {launch.links.mission_patch_small && (
                                    <img
                                        src={launch.links.mission_patch_small}
                                        alt={launch.mission_name + "logo"}
                                    />
                                )}
                            </div>

                            <Grid className="details-text">
                                <Typography
                                    className="tracking-in-expand"
                                    variant="h3"
                                    fontFamily="'Teko', sans-serif"
                                >
                                    <h2>{launch.mission_name}</h2>
                                </Typography>

                                <Grid className="slide-in-right">
                                    <Typography variant="body1" fontFamily="'Teko', sans-serif" >
                                        {launch.details}
                                        {!launch.details && <p>No description available     &#x2639;</p>}
                                        <p>Launch date: {formatDate(launch.launch_date_local)}</p>
                                        <Grid
                                            sx={{
                                                borderBottom: "1px solid",
                                                borderTop: "1px solid",
                                                borderColor: theme.text,
                                            }} >
                                            <h3>Rocket: </h3>
                                            <p>Name: {launch.rocket.rocket_name} </p>
                                            <p>Type: {launch.rocket.rocket_type}</p>
                                        </Grid>
                                    </Typography>
                                </Grid>
                                <Grid
                                    className="slide-in-right">
                                    <Typography
                                        variant="body1"
                                        fontFamily="'Teko', sans-serif">

                                        <p>Launch site: {launch.launch_site.site_name_long}</p>
                                        <p>
                                            Launch success:{" "}
                                            {launch.launch_success ? "Succesfull" : "Not Succesfull"}
                                        </p>
                                    </Typography>
                                </Grid>

                            </Grid>
                        </div>

                        <div>

                            {launch.links.flickr_images &&
                                launch.links.flickr_images.map((img, index) => (
                                    <img
                                        src={img}
                                        alt="launch scene"
                                        key={index}
                                        className="flickr-gallery"
                                        onClick={handleImgClick}
                                    ></img>
                                ))}
                            <div className="single-flicker-image">
                                {currentImage && <img src={currentImage} alt="launch scene" />}
                            </div>


                        </div>

                    </Box>



                )}


            </Container>
        </>
    );
}

export default LaunchDetails;