import updateCurrentJob from "../action/updateCurrentJob";
const handleAddJob = (job) => async (dispatch) => dispatch(updateCurrentJob(job));
export default handleAddJob;