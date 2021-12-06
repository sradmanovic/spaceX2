import { useParams } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import { useHistory } from 'react-router-dom'
import { useContext } from 'react';
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


    return (
        <Container className="slide-in-elliptic-top-fwd">

            { isPending && <div className="loadingio-spinner-eclipse-jc8w54eaf9"><div className="ldio-6zclm0831oa">
                <div></div>
            </div></div>}
            { error && <div> {error} </div>}
            { launch && (
                <Box sx={{
                    flexGrow: 1,
                    backgroundColor: theme.bg,
                    width: '90%',
                    margin: 'auto',
                    padding: '5%',
                    marginTop: '5%',
                    borderRadius: '2%',
                    border: '3px ridge rgb(255, 255, 255, 0.2)',
                    color: theme.text,
                    textAlign: 'justify',
                }}>
                    <div className="btnContainer">
                        <button onClick={handleClick} className="backBtn"> &#x3c; Back </button>
                    </div>

                    <Grid container spacing={1}>
                        <Grid item xs={5}>
                            <img className="rotate-scale-up details-image" src={launch.links.mission_patch_small} alt={launch.mission_name + " logo"} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography className="tracking-in-expand"
                                gutterBottom
                                variant="h2"
                                component="div"
                                sx={{ textAlign: 'center', fontFamily: 'fantasy', textShadow: '1px 1px rgb(109, 108, 108)' }} >
                                {launch.mission_name}
                            </Typography>

                            <Grid className="slide-in-right" item xs={12}>
                                <Typography
                                    variant="body1" sx={{ fontFamily: 'monospace', lineHeight: '1.4' }}>
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
                                    variant="body1" sx={{ fontFamily: 'monospace', lineHeight: '1.7' }}>
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
                                alt="launch" key={index}
                                className="galleryImage" ></img>

                            ))}

                    </div>

                </Box>
            )
            }
        </Container >

    );
}

export default LaunchDetails;