import { SET_COMPANY } from "./actions/setCompanies";
import { SET_CURRENT_COMPANY } from "./actions/setCurrentCompany";
import { SET_COMPANY_ERROR } from "./actions/setCompanyError";
import { START_COMPANY_FETCHING } from "./actions/startCompanyFetching";
import { STOP_COMPANY_FETCHING } from "./actions/stopCompanyFetching";

const initialState = {
    isFetchingCompanies: false,
    companies: [],
    currentCompany: null,
    error: "",
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
        default:
            return state;
    }
}

export default companyReducer;