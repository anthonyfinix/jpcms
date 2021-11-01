import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import classes from './header.module.scss';
import TextField from '@mui/material/TextField';
import openAddNewJobDialog from '../redux/action/openAddNewJobDialog';
import { connect } from 'react-redux';
import handleJobSearch from '../redux/middleware/handleJobSearch'
const JobHeader = ({ addNew, ...props }) => {
    return (
        <div display="flex" className={classes.wrapper}>
            <h3>Jobs</h3>
            <div className={`${classes.addNewBtn}`}>
                <IconButton onClick={addNew} color="primary" aria-label="upload picture" component="span">
                    <AddIcon />
                </IconButton>
            </div>
            <TextField onChange={(e)=>props.handleJobSearch(props.company,e.currentTarget.value)} placeholder="search" size="small" variant="outlined" />
        </div>
    )
}
const mapStateToProps = state => ({
    company:state.COMPANY.currentCompany
})
const mapDispatchToProps = {
    openAddNewJobDialog: () => dispatch => dispatch(openAddNewJobDialog()),
    handleJobSearch
}
export default connect(mapStateToProps, mapDispatchToProps)(JobHeader);