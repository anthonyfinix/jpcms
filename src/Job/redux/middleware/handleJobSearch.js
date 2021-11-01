import setJobErrors from "../action/setJobError";
import setSearchedJobs from "../action/setSearchedJobs";
import getSearchedJobs from "../../api/getSearchedJobs";
import setSearchingJobs from '../action/setSearchingJobs'

const handleJobSearch = (company, query) => dispatch => {
    dispatch(setSearchingJobs(true))
    getSearchedJobs(company, query)
        .then(response => {
            let { error, data } = response;
            if (error) return dispatch(setJobErrors(error));
            if (data) return dispatch(setSearchedJobs(data.result));
        })
        .finally(() => {
            dispatch(setSearchingJobs(false))
        })
};

export default handleJobSearch;