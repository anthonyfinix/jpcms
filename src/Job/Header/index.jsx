import React from 'react';
import { Button,Box } from '@material-ui/core';
import classes from './header.module.css';
const JobHeader = ({addNew}) => {
    return (
        <Box display="flex" className={classes.wrapper} justifyContent="space-between" alignItems="center">
            <h1>Jobs</h1>
            <Button onClick={addNew} variant="contained">Add New</Button>
        </Box>
    )
}
export default JobHeader;