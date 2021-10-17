import changeSingleJobDialogState from "../action/changeSingleJobDialogState";
import updateCurrentJob from "../action/updateCurrentJob";
const updateSingleJobDialogState = (state) => async (dispatch) => {
    dispatch(changeSingleJobDialogState(state))
    if(!state) dispatch(updateCurrentJob({}))
};
export default updateSingleJobDialogState;