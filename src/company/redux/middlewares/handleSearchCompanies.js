import searchCompanies from "../../api/searchCompanies";
import setCompanyError from "../actions/setCompanyError";
import setIsSearchingCompanies from "../actions/setIsSearchingCompanies";
import setSearchedCompanies from "../actions/setSearchedCompanies";

const handleSearchCompanies = query => async dispatch => {
    dispatch(setIsSearchingCompanies(true))
    let response = await searchCompanies(query);
    if (response.error) dispatch(setCompanyError(response.error))
    if (response.result) dispatch(setSearchedCompanies(response.result))
    dispatch(setIsSearchingCompanies(false))

}

export default handleSearchCompanies;