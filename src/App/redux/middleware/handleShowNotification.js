import setNotification from "../action/setNotification";

const handleShowNotification = message => dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
        dispatch(setNotification(null))
    }, 7000)
}

export default handleShowNotification;