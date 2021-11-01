import Snackbar from "@mui/material/Snackbar";
import React from "react";
import { connect } from "react-redux";

export const SnackbarContext = React.createContext("");
const SnackbarProvider = (props) => {
    // const [message, setMessage] = React.useState("");
    // const notify = (message) => {
    //     setMessage(message);
    //     setTimeout(() => setMessage(""), 7000)
    // }
    return (
        <>
            {/* <SnackbarContext.Provider value={{ notify }}> */}
            {props.children}
            <Snackbar open={!!props.message} autoHideDuration={6000} message={props.message} />
            {/* </SnackbarContext.Provider> */}
        </>
    )
}
const mapStateToProps = state => ({ message: state.APP.notification })
export default connect(mapStateToProps)(SnackbarProvider);