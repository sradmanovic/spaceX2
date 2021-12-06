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

        <Card className="scale-in-ver-center" sx={{
            maxWidth: 345,
            height: 580,
            borderRadius: 5,
            backgroundColor: theme.bg,
            overflow: 'hidden',
            color: theme.text,
            borderColor: 'rgb(255, 255, 255, 0.3)',
            borderStyle: 'ridge',
            padding: 4
        }}>
            <div className='image'>
                {launch.links.mission_patch_small ? <img src={launch.links.mission_patch_small} alt={launch.mission_name + " logo"} /> :
                    <img className="default-img" src={image2} alt="spaceX logo" />}
            </div>

            <CardContent sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                padding: 5,
                height: 200,
                textShadow: '1px 1px rgb(105, 105, 105)',
            }}>
                <Typography className="tracking-in-expand"
                    sx={{
                        fontFamily: 'fantasy',
                        letterSpacing: 1,
                        minHeight: 150
                    }}
                    gutterBottom
                    variant="h4"
                    component="div">
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