import { CHANGE_ADD_NEW_DIALOG_STATE } from './action/changeAddNewJobDialogState';
import { SET_JOB_ERROR } from './action/setJobError';
import { SET_JOBS } from "./action/setJobs";
import { START_JOBS_FETCHING } from "./action/startJobsFetching";
import { STOP_JOBS_FETCHING } from "./action/stopJobsFetching";
import { UPDATE_CURRENT_JOB } from './action/updateCurrentJob';
import { SET_SEARCHED_JOBS } from './action/setSearchedJobs'
import { SINGLE_JOB_DIALOG_STATE } from './action/changeSingleJobDialogState';

const initialState = {
    isFetchingJobs: false,
    jobs: [],
    currentJob: {},
    error: "",
    addNewDialogState: false,
    singleJobDialogState: false,
    searchedJobs: []
}
const jobReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case START_JOBS_FETCHING:
            return { ...state, }
        case STOP_JOBS_FETCHING:
            return { ...state, }
        case SET_JOBS:
            return { ...state, jobs: actions.payload }
        case SET_SEARCHED_JOBS:
            return { ...state, searchedJobs: actions.payload }
        case UPDATE_CURRENT_JOB:
            return { ...state, currentJob: actions.payload }
        case SET_JOB_ERROR:
            return { ...state, }
        case CHANGE_ADD_NEW_DIALOG_STATE:
            return { ...state, addNewDialogState: actions.payload }
        case SINGLE_JOB_DIALOG_STATE:
            return { ...state, singleJobDialogState: actions.payload }
        default:
            return state;
    }
}

export default jobReducer;