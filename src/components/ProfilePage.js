import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {

    const { currentUser } = useAuth()

    return (
        <Box className="form-page">
            {currentUser && <h1>Welcome {currentUser.email} !</h1>}
            <Link to="/">Continue to home page?</Link>

        </Box>
    );
}

export default ProfilePage;