import updateCurrentJob from "../action/updateCurrentJob";
import changeSingleJobDialogState from '../action/changeSingleJobDialogState'
const handleAddNewJobDialogClose = () => (dispatch) => {
    dispatch(updateCurrentJob(null))
    dispatch(changeSingleJobDialogState(false))
};
export default handleAddNewJobDialogClose;