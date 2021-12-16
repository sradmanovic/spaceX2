import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from '../context/AuthContext'
import { Alert, Box, Button } from "@mui/material";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import InputField from "./InputField";
import useValidateInput from "../customHooks/useValidateInput";

const Login = () => {

    const { resetPassword } = useAuth()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    //using ThemeContext to change theme
    const { isDarkTheme, light, dark } = useContext(ThemeContext);
    const theme = isDarkTheme ? dark : light

    // handling email input from custom InputField component using state
    const [emailInput, setEmailInput] = useState("")
    function handleChangeEmail(e) {
        setEmailInput(e.target.value)
    }

    // const [confirmPassword, setConfirmPasswordInput] = useState("")

    const [formSubmited, setFormSubmited] = useState(false);
    const { emailValidationError, success } = useValidateInput(formSubmited, emailInput)

    const [message, setMessage] = useState("")

    // invoking firebase login function using AuthContext
    async function handleSubmit(e) {
        e.preventDefault()

        setFormSubmited(true)

        if (success) {
            try {
                setMessage("")
                setError("")
                setLoading(true)
                //invoking reset from AuthContext
                await resetPassword(emailInput)
                setMessage("Check your inbox for further instructions")

            } catch (error) {
                // handle errors
                setError("Failed to reset password")

            }
            setLoading(false)
        }

    }

    //back button
    const handleClick = () => {
        history.goBack();
    }

    return (
        <>
            <Box sx={{ backgroundColor: theme.bg, color: theme.text }} className="form-page">
                <div className="back-btn-container">
                    <button onClick={handleClick} className="back-btn"> &#x3c; Back </button>
                </div>
                <div className="form-title">
                    <h2>Reset Password</h2>
                </div>

                {error && <Alert variant="outlined" severity="error"> {error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <InputField message={message} error={emailValidationError} name="Email: " type="email" required value={emailInput} onChange={handleChangeEmail} />
                    <Button size="large"
                        variant="outlined" type="submit" disabled={loading}>Reset Password</Button>
                </form>
                <Link to='/login'>Log In</Link>
            </Box>
        </>);
}

export default Login;