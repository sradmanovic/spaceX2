import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import image1 from '../images/PngItem_6781246.png'

const Navbar = () => {

    const { toggleTheme } = useContext(ThemeContext)

    return (
        <nav className="navbar">
            <FormControlLabel className="bounce-top" control={<Switch defaultChecked color="default" />} onChange={toggleTheme} label="" />
            <Link to='/'>
                <img className="bounce-top logo" src={image1} alt="spaceX logo" />
            </Link>
        </nav>
    );
}

export default Navbar;
