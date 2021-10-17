
export const SET_JOB_ERROR = "SET_JOB ERROR";
const setJobError = (error) => ({ type: SET_JOB_ERROR, payload: error })
export default setJobError;