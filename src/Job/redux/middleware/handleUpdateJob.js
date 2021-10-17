import getJobs from "../../api/getJobs";
import updateJob from "../../api/updateJob";
import changeAddNewJobDialogState from "../action/changeAddNewJobDialogState";
import setJobError from "../action/setJobError";
import setJobs from "../action/setJobs";
import startFetchingJobs from "../action/startJobsFetching";
import stopFetchingJobs from "../action/stopJobsFetching";
import updateCurrentJob from "../action/updateCurrentJob";
const handleUpdateJob = (company, currentJob) => async (dispatch) => {
    dispatch(startFetchingJobs())
    let response = await updateJob(company, currentJob);
    if(response.error) dispatch(setJobError(response.error))
    dispatch(changeAddNewJobDialogState(false))
    if (!response.error) {
        let getJobsResponse = await getJobs(company)
        dispatch(setJobs(getJobsResponse.data.result));
        dispatch(updateCurrentJob({}))
    }
    dispatch(stopFetchingJobs())

}

export default handleUpdateJob;