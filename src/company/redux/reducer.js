import { SET_COMPANY } from "./actions/setCompanies";
import { SET_CURRENT_COMPANY } from "./actions/setCurrentCompany";
import { SET_COMPANY_ERROR } from "./actions/setCompanyError";
import { START_COMPANY_FETCHING } from "./actions/startFetchingCompany";
import { STOP_COMPANY_FETCHING } from "./actions/stopFetchingCompany";
import { SET_SEARCHING_COMPANIES } from "./actions/setIsSearchingCompanies";
import { SET_IS_CREATING_COMPANY } from "./actions/setIsCreatingCompany";
import { SET_SEARCHED_COMPANIES } from "./actions/setSearchedCompanies";

const initialState = {
    isFetchingCompanies: false,
    companies: [],
    searchedCompanies: [],
    currentCompany: null,
    isSearchingCompanies: false,
    error: "",
    isCreatingCompany: false,
    companyCreationError: null
}
const companyReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case START_COMPANY_FETCHING:
            return { ...state, isFetchingCompanies: true }
        case STOP_COMPANY_FETCHING:
            return { ...state, isFetchingCompanies: false }
        case SET_COMPANY:
            return { ...state, companies: actions.payload }
        case SET_COMPANY_ERROR:
            return { ...state, error: actions.payload }
        case SET_CURRENT_COMPANY:
            return { ...state, currentCompany: actions.payload }
        case SET_SEARCHING_COMPANIES:
            return { ...state, isSearchingCompanies: actions.payload }
        case SET_SEARCHED_COMPANIES:
            return { ...state, searchedCompanies: actions.payload }
        case SET_IS_CREATING_COMPANY:
            return { ...state, isCreatingCompany: actions.payload }
        default:
            return state;
    }
}

export default companyReducer;