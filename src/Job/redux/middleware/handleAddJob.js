import addJob from "../../api/addJob";
import getJobs from "../../api/getJobs";
import changeAddNewJobDialogState from "../action/changeAddNewJobDialogState";
import setJobError from "../action/setJobError";
import setJobs from "../action/setJobs";
import startFetchingJobs from "../action/startJobsFetching";
import stopFetchingJobs from "../action/stopJobsFetching";
import updateCurrentJob from "../action/updateCurrentJob";
const handleAddJob = (company, newJob) => async (dispatch) => {
    dispatch(startFetchingJobs())
    let response = await addJob(company, newJob);
    if(response.error) dispatch(setJobError(response.error))
    dispatch(changeAddNewJobDialogState(false))
    if (!response.error) {
        let getJobsResponse = await getJobs(company)
        dispatch(setJobs(getJobsResponse.data.result));
        dispatch(updateCurrentJob({}))
    }
    dispatch(stopFetchingJobs())

}

export default handleAddJob;