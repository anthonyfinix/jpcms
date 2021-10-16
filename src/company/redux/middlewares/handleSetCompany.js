import setCurrentCompany from "../actions/setCurrentCompany";

const setCompany = (company) => (dispatch) => {
    dispatch(setCurrentCompany(company))
};
export default setCompany;