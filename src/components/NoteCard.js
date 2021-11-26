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

        <Card sx={{
            maxWidth: 345,
            height: 500,
            borderRadius: 5,
            backgroundColor: theme.bg,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            color: theme.text,
            borderColor: 'rgb(255, 255, 255, 0.3)',
            borderStyle: 'ridge',
            padding: 4,
            ':hover': {
                transform: "scale(1.01)",
                transition: "0.1s"
            }
        }}>
            <div className='image'>
                {launch.links.mission_patch_small ? <img src={launch.links.mission_patch_small} alt={launch.mission_name + " logo"} /> :
                    <img className="default-img" src={image2} alt="spaceX logo" />}

            </div>

            <CardContent sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                padding: 5,
                height: 100,
                textShadow: '1px 1px rgb(105, 105, 105)',
            }}>
                <Typography sx={
                    {
                        fontFamily: 'fantasy',
                        letterSpacing: 1
                    }
                }
                    gutterBottom
                    variant="h4"
                    component="div">
                    {launch.mission_name}
                </Typography>
                <Typography
                    variant="body3">
                    {launch.details}
                    {!launch.details &&
                        <p>No description available :(</p>}
                </Typography>
            </CardContent>

            <CardActions
                sx={{
                    justifyContent: 'center',
                    height: 50,

                }} >
                <Link className="details-link" to={`/${launch.flight_number}`}>
                    <Button size="large"
                        variant="outlined"
                        sx={{
                            color: theme.text,
                            ':hover': {
                                bgcolor: 'rgb(221, 218, 218, 0.2)',
                                color: 'black',
                            }
                        }}>More Details</Button>
                </Link>
            </CardActions>
        </Card >
    );
}

export default NoteCard;