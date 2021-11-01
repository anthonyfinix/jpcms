export const SET_COMPANY_CREATION_ERROR = "SET COMPANY CREATION ERROR";
const setCompanyCreationError = (error) => ({ type: SET_COMPANY_CREATION_ERROR, payload: error })
export default setCompanyCreationError;