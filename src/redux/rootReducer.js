import { combineReducers } from "redux";
import jobReducer from "../Job/redux/reducer";
import companyReducer from "../company/redux/reducer";
const rootReducer = combineReducers({
    JOB: jobReducer,
    COMPANY: companyReducer
})

export default rootReducer;