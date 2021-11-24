import { useParams } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import { useHistory } from 'react-router-dom'
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const LaunchDetails = () => {
    const { id } = useParams();
    const { data: launch, error, isPending } = useFetch(process.env.REACT_APP_BASE_URL + id);

    const history = useHistory()

    const { isDarkTheme, light, dark } = useContext(ThemeContext)
    const theme = isDarkTheme ? dark : light

    const handleClick = () => {
        history.go(-1);
    }

    return (
        <div className="launch-details" >
            { isPending && <div className="loading"> Loading... </div>}
            { error && <div> {error} </div>}
            { launch && (
                <Box sx={{
                    flexGrow: 1, backgroundColor: theme.bg, width: '70%',
                    margin: 'auto', padding: '5%',
                    marginTop: '5%',
                    borderRadius: '3%',
                    border: '3px ridge rgb(255, 255, 255, 0.2)'
                }}>
                    <div className="btnContainer">
                        <button onClick={handleClick} className="backBtn"> &#x3c; Back </button>
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <img src={launch.links.mission_patch_small} alt={launch.mission_name + " logo"} />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography gutterBottom variant="h2" component="div" color="white">
                                {launch.mission_name}
                            </Typography>
                            <Grid item xs={12}>
                                <Typography variant="body1" color="white">
                                    {launch.details}
                                    {!launch.details &&
                                        <p>No description available :(</p>}
                                    <h4>Launch date: {launch.launch_date_local}</h4>
                                    <h3>Rocket name: {launch.rocket.rocket_name} </h3>
                                    <h3>Rocket type: {launch.rocket.rocket_type}</h3>
                                </Typography>

                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="body1" color="gray">
                                    <p>Launch site: {launch.launch_site.site_name_long}</p>
                                    <p>Launch success: {launch.launch_success ? "Succesfull" : "Not Succesfull"}</p>
                                </Typography>

                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </div>
    );
}

export default LaunchDetails;