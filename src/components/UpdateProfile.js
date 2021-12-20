import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from '../context/AuthContext'
import { Alert, Button, Container } from "@mui/material";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import InputField from "./InputField";
import useValidateInput from "../customHooks/useValidateInput";


const Signup = () => {

    const { updateEmail, updatePassword, currentUser } = useAuth()

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
        debugger
        setFormSubmited(true)
        if (success) {

            const promises = []
            setLoading(true)
            setError("")

            if (emailInput !== currentUser.email) {
                promises.push(updateEmail(emailInput))
            }
            if (passwordInput) {
                promises.push(updatePassword(passwordInput))
            }

            Promise.all(promises)
                .then(() => {
                    history.push("/profile")
                })
                .catch(() => {

                    const errorMessage = error.message;

                    setError(errorMessage)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }
    //back button
    const handleClick = () => {
        history.goBack();
    }

    return (

        <Container sx={{ backgroundColor: theme.bg, color: theme.text }} className="form-page slide-in-elliptic-top-fwd">
            <div className="back-btn-container">
                <button style={{ color: theme.text }} onClick={handleClick} className="back-btn"> &#x3c; Back </button>
            </div>
            <div className="form-title">
                <h1>Update Profile</h1>
            </div>

            {error && <Alert variant="outlined" severity="error"> {error}</Alert>}
            <form onSubmit={handleSubmit}>
                <InputField error={formSubmited ? emailValidationError : ""} name="Email: " type="email" required value={emailInput} onChange={handleChangeEmail} />

                <InputField error={formSubmited ? passwordValidationError : ""} name="Password: " type="password" required value={passwordInput} onChange={handleChangePassword} />

                <InputField error={formSubmited ? passwordConfirmationError : ""} name="Confirm Password: " type="password" required value={passwordConfirmation} onChange={handlePasswordConfirmation} />
                <Button color="primary" size="large"
                    variant="outlined" type="submit" disabled={loading}>Update</Button>
                <p><small>All * fields are required</small></p>

            </form>

        </Container>

    );
}

export default Signup;