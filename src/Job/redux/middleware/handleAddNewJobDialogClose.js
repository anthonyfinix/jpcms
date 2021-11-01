import updateCurrentJob from "../action/updateCurrentJob";
import changeAddNewJobDialogState from '../action/changeAddNewJobDialogState'
const handleAddNewJobDialogClose = () => (dispatch) => {
    dispatch(updateCurrentJob(null))
    dispatch(changeAddNewJobDialogState(false))
};
export default handleAddNewJobDialogClose;