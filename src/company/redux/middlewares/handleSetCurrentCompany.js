import getCompanyById from "../../api/getCompanyById";
import startFetchingCompany from "../actions/startFetchingCompany";
import stopFetchingCompany from "../actions/stopFetchingCompany";
import setCurrentCompany from '../actions/setCurrentCompany';
import setCompanyError from "../actions/setCompanyError";

const handleSetCurrentCompany = id => dispatch => {
    dispatch(startFetchingCompany())
    getCompanyById(id)
    .then(response => {
            let { error } = response;
            if (error) return dispatch(setCompanyError(error));
            return dispatch(setCurrentCompany(response.result));
        })
        .finally(() => {
            dispatch(stopFetchingCompany())
        })
};

export default handleSetCurrentCompany;