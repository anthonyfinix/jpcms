import updateCurrentJob from "../action/updateCurrentJob";
import changeAddNewJobDialogState from '../action/changeAddNewJobDialogState';
const handleUpdateCurrentJob = (job) => (dispatch) => {
    dispatch(updateCurrentJob(job))
    dispatch(changeAddNewJobDialogState(true))
};
export default handleUpdateCurrentJob;