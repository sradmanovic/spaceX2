import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from '../context/AuthContext'
import { Alert, Button, Container } from "@mui/material";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import InputField from "./InputField";
import useValidateInput from "../customHooks/useValidateInput";


const Signup = () => {

    const { signup } = useAuth()

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

    // handling password confirmation input from custom InputField component using state
    const [passwordConfirmation, setPasswordConfirmationt] = useState("")
    function handlePasswordConfirmation(e) {
        setPasswordConfirmationt(e.target.value)
    }

    // boolean value confirming if form was submited, initialy set to false, changes value when submit button was clicked
    const [formSubmited, setFormSubmited] = useState(false);

    //custom hook for validation 
    //takes in values from input and the value of formSubmited
    //returns error messages to be passed as props to ImportField component and boolean value if the validation inside of the hook was done successfuly
    const { emailValidationError, passwordValidationError, passwordConfirmationError, success } = useValidateInput(emailInput, passwordInput, passwordConfirmation)


    async function handleSubmit(e) {
        e.preventDefault()

        setFormSubmited(true)
        if (success) {
            try {
                setError("")
                setLoading(true)
                //invoking signup from AuthContext
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
                    <h1>Sign Up</h1>
                </div>

                {error && <Alert variant="filled" severity="error"> {error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <InputField error={formSubmited ? emailValidationError : ""} name="Email: " type="email" required value={emailInput} onChange={handleChangeEmail} />

                    <InputField error={formSubmited ? passwordValidationError : ""} name="Password: " required type="password" value={passwordInput} onChange={handleChangePassword} />

                    <InputField required error={formSubmited ? passwordConfirmationError : ""} name="Confirm Password: " type="password" value={passwordConfirmation} onChange={handlePasswordConfirmation} />
                    <Button color="primary" size="large"
                        variant="outlined" type="submit" disabled={loading}>Sign Up</Button>
                </form>
                <p>Already have an account? <span> <Link to='/login'>Log In</Link> </span> </p>
                <small>All * fields are required</small>
            </Container>
        </>
    );
}

export default Signup;