import getJobs from "../../api/getJobs";
import startJobsFetching from "../actions/startJobsFetching";
import stopJobFetching from "../actions/stopJobFetching";
import setJobs from "../actions/setJobs";
import setJobErrors from "../actions/setJobErrors";

const handleSetJobs = options => dispatch => {
    dispatch(startJobsFetching())
    getJobs(options)
        .then(response => {
            let { error, data } = response;
            if (error) return dispatch(setJobErrors(error));
            if (data) return dispatch(setJobs(data.result));
        })
        .finally(() => {
            dispatch(stopJobFetching())
        })
};

export default handleSetJobs;