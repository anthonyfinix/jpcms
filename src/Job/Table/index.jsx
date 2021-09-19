import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import classes from './table.module.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { WindowWidthContext } from '../../WindowWidthProvider';
import moment from 'moment';
const JobTable = (props) => {
    const { width } = React.useContext(WindowWidthContext);
    const [currentRowEl, setCurrentRowEl] = React.useState(null);
    const handleOptionClick = (e, job) => { setCurrentRowEl(e.target); props.selected.current = job }
    const handleView = () => {
        props.handleViewJob()
        setCurrentRowEl(null);
    }
    const handleUpdate = () => {
        props.handleUpdate()
        setCurrentRowEl(null);
    }
    const handleDelete = () => {
        props.handleDelete()
        setCurrentRowEl(null);
    }
    return (
        <>
            <TableContainer className={`${classes.wrapper}`}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={`${classes.cell} ${classes.th}`}>Customer Name</TableCell>
                            {(width > 600) && <TableCell className={`${classes.cell} ${classes.th}`}>Serial Number</TableCell>}
                            {(width > 600) && <TableCell className={`${classes.cell} ${classes.th}`}>Rec Date</TableCell>}
                            {(width > 600) && <TableCell className={`${classes.cell} ${classes.th}`}>Ret Date</TableCell>}
                            {(width > 600) && <TableCell className={`${classes.cell} ${classes.th}`}>Amount</TableCell>}
                            <TableCell className={`${classes.cell} ${classes.th}`}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.jobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell className={classes.td} component="th" scope="row">{job.customerName}</TableCell>
                                {(width > 600) && <TableCell className={`${classes.cell} ${classes.th}`}>{job.serialNumber}</TableCell>}
                                {(width > 600) && <TableCell className={`${classes.cell} ${classes.th}`}>{ moment(job.receivedDate).format("Do MMM YY")}</TableCell>}
                                {(width > 600) && <TableCell className={`${classes.cell} ${classes.th}`}>{ moment(job.returnedDate).format("Do MMM YY")}</TableCell>}
                                {(width > 600) && <TableCell className={`${classes.cell} ${classes.th}`}>{job.amount}</TableCell>}
                                <TableCell className={`${classes.td} ${classes.opt_cell}`} component="th" scope="row"><MoreVertIcon onClick={(e) => handleOptionClick(e, job)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Menu
                id="simple-menu"
                anchorEl={currentRowEl}
                keepMounted
                open={Boolean(currentRowEl)}
                onClose={() => setCurrentRowEl(null)}
            >
                <MenuItem onClick={handleView}>View</MenuItem>
                <MenuItem onClick={handleUpdate}>Update</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </>
    )
}
export default JobTable;