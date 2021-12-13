import { Alert } from "@mui/material";

export default function InputField(props) {

    return (
        <>
            <div className="input-container">
                <label>{props.name}</label>
                <input {...props}></input>
            </div>
            {props.error && <Alert variant="outlined" severity="error">{props.error}</Alert>}
        </>

    )
}

