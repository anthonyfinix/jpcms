import getCompanyById from "../../api/getCompanyById";
import startFetchingCompany from "../actions/startCompanyFetching";
import stopFetchingCompany from "../actions/stopCompanyFetching";
import setCurrentCompany from '../actions/setCurrentCompany';
import setError from "../actions/setError";

const handleSetCurrentCompany = id => dispatch => {
    dispatch(startFetchingCompany())
    getCompanyById(id)
    .then(response => {
            let { error } = response;
            if (error) return dispatch(setError(error));
            return dispatch(setCurrentCompany(response.result));
        })
        .finally(() => {
            dispatch(stopFetchingCompany())
        })
};

export default handleSetCurrentCompany;