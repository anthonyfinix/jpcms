import startJobsFetching from "../action/startJobsFetching";
import stopJobsFetching from "../action/stopJobsFetching";
import setJobErrors from "../action/setJobError";
import setSearchedJobs from "../action/setSearchedJobs";
import getSearchedJobs from "../../api/getSearchedJobs";

const handleSetJobs = (company,query) => dispatch => {
    dispatch(startJobsFetching())
    getSearchedJobs(company,query)
        .then(response => {
            let { error, data } = response;
            if (error) return dispatch(setJobErrors(error));
            if (data) return dispatch(setSearchedJobs(data.result));
        })
        .finally(() => {
            dispatch(stopJobsFetching())
        })
};

export default handleSetJobs;