import updateCurrentJob from "../action/updateCurrentJob";
const handleUpdateCurrentJob = (job) => (dispatch) => dispatch(updateCurrentJob(job));
export default handleUpdateCurrentJob;