import { useEffect, useState } from "react";

const useValidateInput = (formSubmited, emailInput, passwordInput, confirmPassword = null) => {

    const [emailValidationError, setEmailValidationError] = useState("")
    const [passwordValidationError, setPasswordValidationError] = useState("")
    const [passwordConfirmationError, setPasswordConfirmationError] = useState("")
    const [success, setSuccess] = useState(false);

    useEffect(() => {

        //reg exp values for password and email validation
        const paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        //if the value of formSubmitted was changed into true it will run the checks
        //as long as the value is false, meaning submit button was not clicked it will not run the checks, it will send back eror messages empty and the value of success false (as initialized)
        //if it reaches any ot the unvalid conditions it will set the value of success to false which will stop the try/catch block for AuthContext signup function
        if (formSubmited) {

            if (emailInput) {
                if (emailInput.match(email)) {
                    setEmailValidationError("")
                    setSuccess(true);
                    console.log("Enter email match")
                } else {
                    setEmailValidationError("Invalid e-mail format.")
                    setSuccess(false);
                    console.log("Enter emial doesnt match")
                }
            }
            if (passwordInput) {
                if (passwordInput.match(paswd)) {
                    setPasswordValidationError("")
                    setSuccess(true);
                    console.log("Enter password match")
                } else {
                    setPasswordValidationError("Password has to be between 7 and 15 characters long and contain at least one numeric digit and a special character.")
                    setSuccess(false);
                    console.log("Enter password doesnt match")
                }
            }
            if (confirmPassword) {
                if (confirmPassword === passwordInput) {
                    setPasswordConfirmationError("")
                    setSuccess(true)
                } else {
                    setPasswordConfirmationError("Passwords must match!")
                    setSuccess(false);
                }
            }
        }
        //entire function runs every time any of the inputs or formSubmitted boolean changes
    }, [emailInput, passwordInput, confirmPassword, formSubmited])

    return { emailValidationError, passwordValidationError, passwordConfirmationError, success };

}

export default useValidateInput;