import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import classes from './header.module.css';
const JobHeader = ({ addNew }) => {
    return (
        <Box display="flex" className={classes.wrapper} justifyContent="space-between" alignItems="center">
            <h3>Jobs</h3>
            <IconButton onClick={addNew} color="primary" aria-label="upload picture" component="span">
                <AddIcon />
            </IconButton>
        </Box>
    )
}
export default JobHeader;