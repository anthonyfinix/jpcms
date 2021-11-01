import { CHANGE_ADD_NEW_DIALOG_STATE } from './action/changeAddNewJobDialogState';
import { SET_JOB_ERROR } from './action/setJobError';
import { SET_JOBS } from "./action/setJobs";
import { START_JOBS_FETCHING } from "./action/startJobsFetching";
import { STOP_JOBS_FETCHING } from "./action/stopJobsFetching";
import { UPDATE_CURRENT_JOB } from './action/updateCurrentJob';
import { SET_SEARCHED_JOBS } from './action/setSearchedJobs'
import { SINGLE_JOB_DIALOG_STATE } from './action/changeSingleJobDialogState';
import { OPEN_SINGLE_JOB_DIALOG } from './action/openSingleJobDialog';
import { CLOSE_SINGLE_JOB_DIALOG } from './action/closeSingleJobDialog';
import { OPEN_UPDATE_JOB_DIALOG } from './action/openUpdateJobDialog';
import { CLOSE_ADD_NEW_JOB_DIALOG } from './action/closeAddNewJobDialog';
import { OPEN_ADD_NEW_JOB_DIALOG } from './action/openAddNewJobDialog';
import { SET_JOBS_SEARCHING } from './action/setSearchingJobs';
import { INCREASE_JOB_PAGE } from './action/increareJobPage';

const initialState = {
    isFetchingJobs: false,
    jobs: [],
    currentJob: null,
    error: "",
    addNewDialogState: false,
    singleJobDialogState: false,
    searchedJobs: [],
    isSearchingJobs: false,
    currentPage: 1
}
const jobReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_JOBS_FETCHING:
            return { ...state, isFetchingJobs: true }
        case STOP_JOBS_FETCHING:
            return { ...state, isFetchingJobs: false }
        case SET_JOBS_SEARCHING:
            return { ...state, isSearchingJobs: action.payload }
        case SET_JOBS:
            return { ...state, jobs: action.payload }
        case SET_SEARCHED_JOBS:
            return { ...state, searchedJobs: action.payload }
        case UPDATE_CURRENT_JOB:
            return { ...state, currentJob: action.payload }
        case SET_JOB_ERROR:
            return { ...state, }
        case CHANGE_ADD_NEW_DIALOG_STATE:
            return { ...state, addNewDialogState: action.payload }
        case OPEN_ADD_NEW_JOB_DIALOG:
            return { ...state, currentJob: null, addNewDialogState: false }
        case SINGLE_JOB_DIALOG_STATE:
            return { ...state, singleJobDialogState: action.payload }
        case OPEN_SINGLE_JOB_DIALOG:
            return { ...state, currentJob: action.payload, singleJobDialogState: true }
        case CLOSE_SINGLE_JOB_DIALOG:
            return { ...state, currentJob: null, singleJobDialogState: false }
        case OPEN_UPDATE_JOB_DIALOG:
            return { ...state, currentJob: action.payload, addNewDialogState: true }
        case CLOSE_ADD_NEW_JOB_DIALOG:
            return { ...state, currentJob: null, addNewDialogState: false }
        case INCREASE_JOB_PAGE:
            return { ...state, currentPage: action.payload }
        default:
            return state;
    }
}

export default jobReducer;