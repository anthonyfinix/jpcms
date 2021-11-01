import getJobs from '../../api/getJobs';
import startFetchingJobs from '../action/startJobsFetching';
import stopFetchingJobs from '../action/stopJobsFetching';
import setJobs from '../action/setJobs';
import setJobError from '../action/setJobError';
import increaseJobPage from '../action/increareJobPage';

const handleNextPage = (company, currentPage, jobs) => async dispatch => {
    // console.log("company",company)
    // console.log("current page number",currentPage)
    // console.log("Jobs",jobs)
    dispatch(startFetchingJobs())
    getJobs(company, { page: currentPage + 1 })
        .then(response => {
            let { error, data } = response;
            if (error) return dispatch(setJobError(error));
            if (data) {
                dispatch(increaseJobPage(currentPage + 1))
                return dispatch(setJobs([...jobs, ...data.result]))
            };
        })
        .finally(() => {
            dispatch(stopFetchingJobs())
        })

}

export default handleNextPage;