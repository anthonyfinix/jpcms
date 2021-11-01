import updateCurrentJob from "../action/updateCurrentJob";
import changeSingleJobDialogState from "../action/changeSingleJobDialogState";
const handleUpdateCurrentJob = (job) => (dispatch) => {
    dispatch(updateCurrentJob(job))
    dispatch(changeSingleJobDialogState(true))
};
export default handleUpdateCurrentJob;