import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import image2 from '../images/timerocket-1464312-1280x960.jpg'


const NoteCard = ({ launch }) => {

    const { isDarkTheme, light, dark } = useContext(ThemeContext);
    const theme = isDarkTheme ? dark : light

    return (

        <Card className="note-card scale-in-ver-center" sx={{
            borderRadius: 5,
            backgroundColor: theme.bg,
            color: theme.text,
        }}>
            <div className='image'>
                {launch.links.mission_patch_small ? <img src={launch.links.mission_patch_small} alt={launch.mission_name + " logo"} /> : <img className="default-img" src={image2} alt="spaceX logo" />}
            </div>

            <CardContent className="card-content">
                <Typography className="card-name tracking-in-expand"
                    variant="h3" fontFamily="'Teko', sans-serif"
                    sx={{
                        letterSpacing: 2,
                        minHeight: 150,
                    }}>
                    {launch.mission_name}
                </Typography>

                <Typography
                    sx={{ whiteSpace: 'nowrap' }}
                    variant="body3" >
                    {launch.details}
                    {!launch.details &&
                        <p>No description available :(</p>}
                </Typography>
            </CardContent>

            <CardActions className="card-actions" >
                <Link className="details-link" to={`/${launch.flight_number}`}>
                    <Button
                        size="large"
                        variant="outlined"

                        sx={{ color: theme.text }}>More Details</Button>
                </Link>
            </CardActions>
        </Card >
    );
}

export default NoteCard;