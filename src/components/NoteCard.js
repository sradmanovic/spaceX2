import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';



const NoteCard = ({ launch }) => {
    const [theme] = useContext(ThemeContext)

    return (

        <Card sx={{
            maxWidth: 345, height: 500, borderRadius: 5, backgroundColor: theme, overflow: 'hidden',
            whiteSpace: 'nowrap', color: "white", borderColor: 'rgb(255, 255, 255, 0.2)', borderStyle: 'ridge', padding: 4, transitionDuration: 1000,
            ':hover': {
                transform: "scale(1.02)"
            }
        }}>
            <div className='slika'>
                {launch.links.mission_patch_small ? <img src={launch.links.mission_patch_small} alt={launch.mission_name + " logo"} /> :
                    <img src="../images/timerocket-1464312-1280x960.jpg" alt="spaceX logo" />}

            </div>

            <CardContent sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                padding: 5
            }}>
                <Typography gutterBottom variant="h4" component="div">
                    {launch.mission_name}
                </Typography>
                <Typography variant="body3" color="white">
                    {launch.details}
                    {!launch.details &&
                        <p>No description available :(</p>}
                </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: 'center' }} >
                <Link className="details-link" to={`/${launch.flight_number}`}>
                    <Button size="large" variant="outlined" sx={{
                        color: 'white',
                        ':hover': {
                            bgcolor: 'rgb(221, 218, 218, 0.4)',
                            color: 'black',
                        }
                    }}>More Details</Button>
                </Link>
            </CardActions>
        </Card >
    );
}

export default NoteCard;