import changeAddNewJobDialogState from "../action/changeAddNewJobDialogState";
import updateCurrentJob from "../action/updateCurrentJob";
const updateAddNewJobDialogState = (state) => async (dispatch) => {
    dispatch(changeAddNewJobDialogState(state))
    if(!state) dispatch(updateCurrentJob({}))
};
export default updateAddNewJobDialogState;