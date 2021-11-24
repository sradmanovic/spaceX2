import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {

    const { toggleTheme } = useContext(ThemeContext)

    return (
        <Toolbar >
            <FormControlLabel color="inherit" control={<Switch defaultChecked color="default" />} onChange={toggleTheme} label="" />
        </Toolbar>
    );
}

export default Navbar;
