import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

const Navbar = () => {

    const [theme, setTheme] = useContext(ThemeContext)

    const lightColor = "rgb(255, 255, 255, 0.3)";
    const darkColor = "rgba(10, 10, 10, 0.5)";

    const handleTheme = () => {
        if (theme === darkColor) {
            setTheme(lightColor)

        } else if (theme === lightColor) {
            setTheme(darkColor)

        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar style={{ backgroundColor: theme }} position="static"  >
                <Toolbar >
                    <FormControlLabel color="inherit" control={<Switch defaultChecked color="default" />} onChange={handleTheme} label="" />
                </Toolbar>
            </AppBar>

        </Box>
    );
}

export default Navbar;
