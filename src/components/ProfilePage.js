import { Container } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ProfilePage = () => {

    const { currentUser, logout } = useAuth()

    const { isDarkTheme, light, dark } = useContext(ThemeContext);
    const theme = isDarkTheme ? dark : light

    const [logError, setLogError] = useState()

    const history = useHistory()
    //firebase logout function invoked using AuthContext
    async function handleLogout() {
        setLogError('')
        try {
            setLogError('')
            await logout()
            history.pushState('/login')
        } catch {
            setLogError("")
        }
    }
    //back button
    const handleClick = () => {
        history.goBack();
    }

    return (
        <Container sx={{
            backgroundColor: theme.bg,
            color: theme.text,
            marginBottom: "20px"
        }} className="form-page slide-in-elliptic-top-fwd">
            <div className="back-btn-container">
                <button style={{ color: theme.text }} onClick={handleClick} className="back-btn"> &#x3c; Back </button>
            </div>

            <div className="welcome-user slide-in-right">
                <h1>Welcome </h1>
                <h1>{currentUser.email} !</h1>
            </div>

            <div>
                <Link to="/">
                    <button title="back to top" className="profile-buttons">
                        &#x2616;
            </button>
                </Link>
                <p>Home page</p>
            </div>


            <div>
                <Link to="/update-profile">
                    <button title="back to top" className="profile-buttons">
                        &#x21ba;
            </button>
                </Link>
                <p> Update Profile</p>
            </div>


            <div>
                <Link to="/update-profile">
                    <button title="back to top" onClick={handleLogout} className="profile-buttons">
                        &#x21ba;
            </button></Link>
                <p>Logout</p>
            </div>



        </Container>
    );
}

export default ProfilePage;