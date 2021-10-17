import getJobs from "../../api/getJobs";
import startJobsFetching from "../action/startJobsFetching";
import stopJobsFetching from "../action/stopJobsFetching";
import setJobs from "../action/setJobs";
import setJobErrors from "../action/setJobError";

const handleSetJobs = (company,options) => dispatch => {
    dispatch(startJobsFetching())
    getJobs(company,options)
        .then(response => {
            let { error, data } = response;
            if (error) return dispatch(setJobErrors(error));
            if (data) return dispatch(setJobs(data.result));
        })
        .finally(() => {
            dispatch(stopJobsFetching())
        })
};

export default handleSetJobs;