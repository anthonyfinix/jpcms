import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import classes from './header.module.scss';
import TextField from '@mui/material/TextField';
const JobHeader = ({ addNew,...props }) => {
    return (
        <div display="flex" className={classes.wrapper} justifyContent="space-between" alignItems="center">
            <h3>Jobs</h3>
            <div className={`${classes.addNewBtn}`}>
                <IconButton onClick={addNew} color="primary" aria-label="upload picture" component="span">
                    <AddIcon />
                </IconButton>
            </div>
            <TextField onChange={props.handleSearch} placeholder="search" size="small" variant="outlined" />
        </div>
    )
}
export default JobHeader;