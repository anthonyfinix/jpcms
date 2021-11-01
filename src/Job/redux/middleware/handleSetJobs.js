import getJobs from "../../api/getJobs";
import startFetchingJobs from "../action/startJobsFetching";
import stopFetchingJobs from "../action/stopJobsFetching";
import setJobs from "../action/setJobs";
import setJobError from "../action/setJobError";

const handleSetJobs = (company,options) => dispatch => {
    dispatch(startFetchingJobs())
    getJobs(company,options)
        .then(response => {
            let { error, data } = response;
            if (error) return dispatch(setJobError(error));
            if (data) return dispatch(setJobs(data.result));
        })
        .finally(() => {
            dispatch(stopFetchingJobs())
        })
};

export default handleSetJobs;