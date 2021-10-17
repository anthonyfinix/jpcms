export const UPDATE_CURRENT_JOB = "UPDATE CURRENT JOB";
const updateCurrentJob = (companies) => ({ type: UPDATE_CURRENT_JOB, payload: companies })
export default updateCurrentJob;