import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from '../context/AuthContext'
import { Alert, Button, Container } from "@mui/material";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import InputField from "./InputField";
import useValidateInput from "../customHooks/useValidateInput";

const Login = () => {

    const { login } = useAuth()

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

    // handling password input from custom InputField component using state
    const [passwordInput, setPasswordInput] = useState("")
    function handleChangePassword(e) {
        setPasswordInput(e.target.value)
    }

    //using custom hook to validate input
    const [formSubmited, setFormSubmited] = useState(false);
    const { emailValidationError, passwordValidationError, success } = useValidateInput(emailInput, passwordInput)

    // invoking firebase login function using AuthContext
    async function handleSubmit(e) {
        e.preventDefault()

        setFormSubmited(true)
        console.log(formSubmited)
        if (success) {
            try {
                setError("")
                setLoading(true)
                //invoking login from AuthContext
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

    }
    //back button
    const handleClick = () => {
        history.goBack();
    }

    return (
        <>
            <Container spacing={2} sx={{ backgroundColor: theme.bg, color: theme.text }} className="form-page slide-in-elliptic-top-fwd">
                <div className="back-btn-container">
                    <button style={{ color: theme.text }} onClick={handleClick} className="back-btn"> &#x3c; Back </button>
                </div>
                <div className="form-title">
                    <h2>Log In</h2>
                </div>

                {error && <Alert variant="filled" severity="error"> {error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <InputField error={formSubmited ? emailValidationError : ""} name="Email: " type="email" required value={emailInput} onChange={handleChangeEmail} />

                    <InputField error={formSubmited ? passwordValidationError : ""} name="Password: " type="password" required value={passwordInput} onChange={handleChangePassword} />
                    <Button size="large"
                        variant="outlined" type="submit" disabled={loading}>Log In</Button>
                </form>
                <p> <Link to='/forgot-password'> Forgot your password? </Link></p>
                <p>Don't have an account? <span> <Link to='/signup'>Sign Up</Link> </span> </p>

                <small>All * fields are required</small>
            </Container>
        </>);
}

export default Login;