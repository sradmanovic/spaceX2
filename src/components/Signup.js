import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from '../context/AuthContext'
import { Alert, Box } from "@mui/material";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import InputField from "./InputField";


const Signup = () => {

    const { signup, currentUser } = useAuth()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    const history = useHistory()

    //using ThemeContext to change theme
    const { isDarkTheme, light, dark } = useContext(ThemeContext);
    const theme = isDarkTheme ? dark : light

    // invoking firebase signup function using AuthContext
    // validating inputs via reg exp
    async function handleSubmit(e) {
        e.preventDefault()

        //reg exp 7-15 characters including symbol and number
        const paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

        const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (!passwordInput.match(paswd)) {
            setError("")
            return setError("Password has to be at least 7 characters long and contain at least one numeric digit and a special character.")
        }

        if (!emailInput.match(email)) {
            setError("")
            return setError("Invalid e-mail format.")
        }

        //invoking signup from AuthContext
        try {
            setError("")
            setLoading(true)
            await signup(emailInput, passwordInput)
            history.push("/profile")
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/weak-password') {
                setError('The password is too weak.');
            } else {
                setError(errorMessage);
            }

        }
        setLoading(false)
    }

    // handling input from custom InputField component using state
    const [emailInput, setEmailInput] = useState()
    const [passwordInput, setPasswordInput] = useState()

    function handleChangeEmail(e) {
        setEmailInput(e.target.value)
    }
    function handleChangePassword(e) {
        setPasswordInput(e.target.value)
    }


    return (
        <>
            <Box sx={{ backgroundColor: theme.bg }} className="form-page">
                <h1>Sign Up</h1>
                {currentUser ? currentUser.email : "No user signed up"}
                {error && <Alert variant="outlined" severity="error"> {error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <InputField name="Email: " type="email" required value={emailInput} onChange={handleChangeEmail} />
                    <div>
                        {emailInput && emailInput}
                    </div>
                    <InputField name="Password: " type="password" required value={passwordInput} onChange={handleChangePassword} />
                    <div>
                        {passwordInput && passwordInput}
                    </div>
                    <button className="submit-button" type="submit" disabled={loading}>Sign Up</button>
                </form>
                <p>Already have an account? <span> <Link to='/login'>Log In</Link> </span> </p>
            </Box>
        </>
    );
}

export default Signup;