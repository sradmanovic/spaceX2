import { Alert } from "@mui/material";

export default function InputField(props) {

    return (
        <>
            <div className="input-container">
                <label> {props.required && "*"} {props.name}</label>
                <input {...props}></input>
                {props.error && <Alert variant="outlined" severity="error">{props.error}</Alert>}
                {props.message && <Alert variant="outlined" severity="success">{props.message}</Alert>}

            </div>

        </>

    )
}

