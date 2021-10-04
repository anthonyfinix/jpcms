import { Snackbar } from "@material-ui/core";
import React from "react";

export const SnackbarContext = React.createContext("");
const SnackbarProvider = (props) => {
    const [message, setMessage] = React.useState("");
    const notify = (message) => {
        setMessage(message);
        setTimeout(() => setMessage(""), 7000)
    }
    return (
        <SnackbarContext.Provider value={{ notify }}>
            {props.children}
            <Snackbar open={!!message} autoHideDuration={6000} message={message} />
        </SnackbarContext.Provider>
    )
}
export default SnackbarProvider;