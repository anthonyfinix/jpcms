import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import classes from './companySelectDialog.module.scss';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// import CustomDropdown from '../../shared/Dropdown';
import { connect } from 'react-redux';
// import searchCompanies from '../api/searchCompanies';
import { ClickAwayListener, Popper } from '@mui/material';
import config from '../../config';
import handleSetCurrentCompany from '../redux/middlewares/handleSetCurrentCompany';
import handleSearchCompanies from '../redux/middlewares/handleSearchCompanies'
const CompanySelectionDialog = (props) => {
    // const [searchResults, setSearchResults] = React.useState([]);
    const [textFieldRef, setTextFieldRef] = React.useState(false);
    const handleSearchResultClose = () => setTextFieldRef(false);
    const handleCompanySearch = (e) => {
        let value = e.currentTarget.value;
        // searchCompanies(value).then(response => setSearchResults(response.result))
        props.handleSearchCompanies(value)
        if (value) setTextFieldRef(e.currentTarget);
    };
    const handleCompanyClick = (company) => {
        localStorage.setItem(config.localStorageCurrCompId, company._id);
        handleSearchResultClose();
        props.handleSetCurrentCompany(company._id)
    }
    const ResultList = (props) => {
        return (
            <List>
                {props.isLoading && <ListItem key={"searching"} disablePadding><ListItemButton><ListItemText primary="searching..." /></ListItemButton></ListItem>}
                {
                    props.searchedCompanies.map(company => {
                        return (
                            <ListItem key={company._id} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={company.name} onClick={(_) => handleCompanyClick(company)} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }
    return (
        <>
            <div className={`${classes.main_wrapper}`}>
                <Card variant="outlined" className={`${classes.card_wrapper} p-md`}>
                    <Typography variant="h5">Select Company</Typography>
                    <Typography variant="subtitle">We were not able to identify the company you are trying to access. please select on of the company</Typography>
                    <TextField onChange={handleCompanySearch} label="Search Company" variant="outlined" size="small" />
                    {/* <CustomDropdown onClose={handleSearchResultClose} el={textFieldRef} content={<ResultList />} /> */}
                    <ClickAwayListener onClickAway={handleSearchResultClose}>
                        <Popper placement="bottom-start" open={Boolean(textFieldRef)} anchorEl={textFieldRef}>
                            <Card>
                                <ResultList isLoading={props.isLoading} searchedCompanies={props.searchedCompanies} />
                            </Card>
                        </Popper>
                    </ClickAwayListener>
                    <div className={`${classes.action_wrapper}`}>
                        <Button onClick={props.createCompany} >Create</Button>
                        <Button variant="contained">Select</Button>
                    </div>
                </Card>
            </div>
        </>
    )
}
const mapStateToProps = state => ({ companies: state.COMPANY.companies, isLoading: state.COMPANY.isSearchingCompanies, searchedCompanies: state.COMPANY.searchedCompanies });
const mapDispatchToProps = { handleSetCurrentCompany, handleSearchCompanies };
export default connect(mapStateToProps, mapDispatchToProps)(CompanySelectionDialog);