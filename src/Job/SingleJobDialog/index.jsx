import React from "react";
import moment from "moment";
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
const SingleJobDialog = ({ open, handleClose, job, ...props }) => {
    const handleDialogClose = () => {
        handleClose()
    }
    if (!job) return null
    return (
        <Dialog open={open} fullWidth={true} onClose={handleDialogClose}>
            <Box padding="30px">
                <div>
                    <Typography variant="overline" display="block" gutterBottom>Customer name</Typography>
                    <Typography variant="h6" gutterBottom component="div">{job.customerName}</Typography>
                </div>
                <div>
                    <Typography variant="overline" display="block" gutterBottom>Model Number</Typography>
                    <Typography variant="h6" gutterBottom component="div">{job.model}</Typography>
                </div>
                <div>
                    <Typography variant="overline" display="block" gutterBottom>Received Date</Typography>
                    <Typography variant="h6" gutterBottom component="div">{moment(job.receivedDate).format("Do MMM YY")}</Typography>
                </div>
                <div>
                    <Typography variant="overline" display="block" gutterBottom>Returned Date</Typography>
                    <Typography variant="h6" gutterBottom component="div">{moment(job.returnedDate).format("Do MMM YY")}</Typography>
                </div>
                <div>
                <Typography variant="overline" display="block" gutterBottom>Amount</Typography>
                <Typography variant="h6" gutterBottom component="div">{job.amount}</Typography>
                </div>
                <div>
                <Typography variant="overline" display="block" gutterBottom>Description</Typography>
                <Typography variant="h6" gutterBottom component="div">{job.detailedDescription}</Typography>
                </div>
            </Box>
        </Dialog>
    )
}

export default SingleJobDialog;