import React from "react"
import { connect } from "react-redux";
import config from "../config";
import LoadingSpinner from '../shared/LoadingSpinner';
import CompanySelectionDialog from "./CompanySelectDialog";
import handleSetCurrentCompany from "./redux/middlewares/handleSetCurrentCompany";
// import setCompany from './redux/middlewares/setCompany';
export const CompanyContext = React.createContext(null);
const CompanyProvider = (props) => {
    React.useEffect(() => {
        let currentCompanyId = localStorage.getItem(config.localStorageCurrCompId);
        if (currentCompanyId && !props.currentCompany && !props.isFetchingCompanies) props.handleSetCurrentCompany(currentCompanyId);
        //     if (!props.error && !props.isFetchingCompanies) props.handleSetCompanies();
    }, [])
    if (props.isFetchingCompanies) return <LoadingSpinner />
    if (props.error) return <h1>There is a company error</h1>
    if (!props.currentCompany) return <CompanySelectionDialog />
    // if (!props.currentCompany) {
    //     let currentCompanyId = localStorage.getItem(config.localStorageCurrCompId);
    //     if (!currentCompanyId) return <CompanySelectionDialog/>
    // }
    return <>{props.children}</>
}
const mapStateToProps = (state) => ({ ...state.COMPANY })
const mapDispatchToProps = { handleSetCurrentCompany }
export default connect(mapStateToProps, mapDispatchToProps)(CompanyProvider);