import createCompany from "../../api/createCompany";
import setCompanyCreationError from "../actions/setCompanyCreationError";
import setCurrentCompany from "../actions/setCurrentCompany";
import setIsCreatingCompany from "../actions/setIsCreatingCompany";
import config from "../../../config";
const handleCreateCompany = ({ name, password }) => async dispatch => {
    dispatch(setIsCreatingCompany(true))
    let response = await createCompany(name, password);
    if (response.error) dispatch(setCompanyCreationError(response.error))
    if (!response.error) {
        localStorage.setItem(config.localStorageCurrCompId, response._id);
        dispatch(setCurrentCompany(response))
    }
    dispatch(setIsCreatingCompany(false))

}

export default handleCreateCompany;