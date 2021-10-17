import deleteJob from "../../api/deleteJob";
import getJobs from "../../api/getJobs";
import setJobError from "../action/setJobError";
import setJobs from "../action/setJobs";
import startFetchingJobs from "../action/startJobsFetching";
import stopFetchingJobs from "../action/stopJobsFetching";
const handleDeleteJob = (company, id) => async (dispatch) => {
    dispatch(startFetchingJobs())
    let response = await deleteJob(company, id);
    if(response.error) dispatch(setJobError(response.error))
    if (!response.error) {
        let getJobsResponse = await getJobs(company)
        dispatch(setJobs(getJobsResponse.data.result));
    }
    dispatch(stopFetchingJobs())

}

export default handleDeleteJob;