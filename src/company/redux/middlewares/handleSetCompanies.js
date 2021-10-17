import getCompanies from "../../api/getCompanies";
import startFetchingCompany from "../actions/startCompanyFetching";
import stopFetchingCompany from "../actions/stopCompanyFetching";
import setCompanies from "../actions/setCompanies";
import setCompanyError from "../actions/setCompanyError";

const handleSetCompanies = options => dispatch => {
    dispatch(startFetchingCompany())
    getCompanies(options)
        .then(response => {
            let { error, data } = response;
            if (error) return dispatch(setCompanyError(error));
            if (data) return dispatch(setCompanies(data.result));
        })
        .finally(() => {
            dispatch(stopFetchingCompany())
        })
};

export default handleSetCompanies;