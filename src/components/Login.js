import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from '../context/AuthContext'
import { Alert, Box } from "@mui/material";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import InputField from "./InputField";

const Login = () => {

    const { login, currentUser } = useAuth()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    //using ThemeContext to change theme
    const { isDarkTheme, light, dark } = useContext(ThemeContext);
    const theme = isDarkTheme ? dark : light

    // handling input from custom input component using state
    const [emailInput, setEmailInput] = useState()
    const [passwordInput, setPasswordInput] = useState()

    function handleChangeEmail(e) {
        setEmailInput(e.target.value)
    }
    function handleChangePassword(e) {
        setPasswordInput(e.target.value)
    }

    // useDebounce(handleChangeEmail, emailInput)

    // invoking firebase login function using AuthContext
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            //invoking signup from AuthContext
            setError("")
            setLoading(true)
            await login(emailInput, passwordInput)
            history.push("/profile")
        } catch (error) {
            // handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                setError('Wrong password.');
            } else {
                setError(errorMessage);
            }

        }
        setLoading(false)
    }

    return (
        <>
            <Box sx={{ backgroundColor: theme.bg }} className="form-page">
                <p>You must be logged in to access Mission Details page.</p>
                {error && <Alert variant="outlined" severity="error"> {error}</Alert>}
                {currentUser ? currentUser.email : "No user logged in"}
                <form onSubmit={handleSubmit}>
                    <InputField name="Email: " type="email" required value={emailInput} onChange={handleChangeEmail} />
                    <div>
                        {emailInput && emailInput}
                    </div>
                    <InputField name="Password: " type="password" required value={passwordInput} onChange={handleChangePassword} />
                    <div>
                        {passwordInput && passwordInput}
                    </div>
                    <button className="submit-button" type="submit" disabled={loading}>Log In</button>
                </form>
                <p>Don't have an account? <span> <Link to='/signup'>Sign Up</Link> </span> </p>
            </Box>
        </>);
}

export default Login;