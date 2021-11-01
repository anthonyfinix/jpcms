import { combineReducers } from "redux";
import jobReducer from "../Job/redux/reducer";
import companyReducer from "../company/redux/reducer";
import AppReducer from "../App/redux/reducer";
const rootReducer = combineReducers({
    JOB: jobReducer,
    COMPANY: companyReducer,
    APP:AppReducer
})

export default rootReducer;