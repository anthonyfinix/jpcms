import { SET_JOB_ERROR } from './action/setJobError';
import { SET_JOBS } from "./action/setJobs";
import { START_JOBS_FETCHING } from "./action/startJobsFetching";
import { STOP_JOBS_FETCHING } from "./action/stopJobsFetching";

const initialState = {
    isFetchingJobs: false,
    jobs: [],
    error: "",
}
const jobReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case START_JOBS_FETCHING:
            return { ...state, }
        case STOP_JOBS_FETCHING:
            return { ...state, }
        case SET_JOBS:
            return { ...state, }
        case SET_JOB_ERROR:
            return { ...state, }
        default:
            return state;
    }
}

export default jobReducer;