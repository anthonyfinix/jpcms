import React from "react"
import { connect } from "react-redux";
import config from "../config";
import LoadingSpinner from '../shared/LoadingSpinner';
import handleSetCompanies from './redux/middlewares/handleSetCompanies';
// import setCompany from './redux/middlewares/setCompany';
export const CompanyContext = React.createContext(null);
const CompanyProvider = (props) => {
    React.useEffect(() => {
        if (!props.error && !props.isFetchingCompanies) props.handleSetCompanies();
    }, [])
    if (props.isFetchingCompanies) return <LoadingSpinner />
    if (props.error) return <h1>There is a company error</h1>
    if (!props.currentCompany) {
        let currentCompanyId = localStorage.getItem(config.localStorageCurrCompId);
        if (!currentCompanyId) return <h1>"no company selected"</h1>
    }
    return <>{props.children}</>
}
const mapStateToProps = (state) => ({ ...state.COMPANY })
const mapDispatchToProps = { handleSetCompanies }
export default connect(mapStateToProps, mapDispatchToProps)(CompanyProvider);