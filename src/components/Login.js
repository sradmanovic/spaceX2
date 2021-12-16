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

    // const [confirmPassword, setConfirmPasswordInput] = useState("")

    const [formSubmited, setFormSubmited] = useState(false);
    const { emailValidationError, passwordValidationError, success } = useValidateInput(formSubmited, emailInput, passwordInput)

    // invoking firebase login function using AuthContext
    async function handleSubmit(e) {
        e.preventDefault()
        debugger
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
            <Container sx={{ backgroundColor: theme.bg, color: theme.text }} className="form-page">
                <div className="back-btn-container">
                    <button onClick={handleClick} className="back-btn"> &#x3c; Back </button>
                </div>
                <h2>Log In</h2>
                {error && <Alert variant="outlined" severity="error"> {error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <InputField error={emailValidationError} name="Email: " type="email" required value={emailInput} onChange={handleChangeEmail} />

                    <InputField error={passwordValidationError} name="Password: " type="password" required value={passwordInput} onChange={handleChangePassword} />
                    <Button size="large"
                        variant="outlined" type="submit" disabled={loading}>Log In</Button>
                </form>
                <p>Don't have an account? <span> <Link to='/signup'>Sign Up</Link> </span> </p>
                <p>Forgot your password? <span> <Link to='/forgot-password'>Reset Password</Link> </span> </p>
                <small>All * fields are required</small>
            </Container>
        </>);
}

export default Login;