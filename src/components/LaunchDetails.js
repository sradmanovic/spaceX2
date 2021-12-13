import { useParams } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import { useHistory } from 'react-router-dom'
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container } from "@mui/material";
import image2 from '../images/timerocket-1464312-1280x960.jpg'


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

    return (
        <Container className="slide-in-elliptic-top-fwd">

            { isPending && <div className="loadingio-spinner-eclipse-jc8w54eaf9"><div className="ldio-6zclm0831oa"><div></div></div></div>}
            { error && <div> {error} </div>}
            { launch && (
                <Box className="details-box" sx={{
                    backgroundColor: theme.bg,
                    borderRadius: '2%',
                    border: '3px ridge rgb(255, 255, 255, 0.2)',
                    color: theme.text,

                }}>
                    <div className="back-btn-container">
                        <button onClick={handleClick} className="back-btn"> &#x3c; Back </button>
                    </div>

                    <Grid container spacing={1}>
                        <Grid item xs={5}>
                            <div className="details-image">
                                {launch.links.mission_patch_small ? <img src={launch.links.mission_patch_small} alt={launch.mission_name + "logo"} /> : <img className="default-img" src={image2} alt="spaceX logo" />}
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography className="tracking-in-expand"
                                gutterBottom
                                variant="h2"
                                sx={{ fontFamily: 'fantasy' }} >
                                {launch.mission_name}
                            </Typography>

                            <Grid className="slide-in-right" item xs={12}>
                                <Typography
                                    variant="body1" sx={{ fontFamily: 'monospace' }}>
                                    {launch.details}
                                    {!launch.details &&
                                        <p>No description available :(</p>}
                                    <p>Launch date: {formatDate(launch.launch_date_local)}</p>
                                    <Grid sx={{ borderBottom: '1px solid', borderTop: '1px solid', borderColor: theme.text }}>
                                        <h3>Rocket: </h3>
                                        <p>Name: {launch.rocket.rocket_name} </p>
                                        <p>Type: {launch.rocket.rocket_type}</p>
                                    </Grid>
                                </Typography>
                            </Grid>
                            <Grid className="slide-in-right" item xs={12}>
                                <Typography
                                    variant="body1" sx={{ fontFamily: 'monospace' }}>
                                    <p>Launch site: {launch.launch_site.site_name_long}</p>
                                    <p>Launch success: {launch.launch_success ? "Succesfull" : "Not Succesfull"}</p>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <div>
                        {launch.links.flickr_images &&
                            launch.links.flickr_images.map((img, index) => (<img
                                src={img}
                                alt="launch scene" key={index}
                                className="flickr-gallery" ></img>
                            ))}
                    </div>
                </Box>
            )
            }
        </Container >

    );
}

export default LaunchDetails;