import React from "react";
import moment from "moment";
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
const SingleJobDialog = ({ open, handleClose, job, ...props }) => {
    const handleDialogClose = () => {
        handleClose()
    }
    if (!job) return null
    return (
        <Dialog open={open} onClose={handleDialogClose}>
            <Box padding="30px">
                <div>
                    <p>Customer name</p>
                    <p style={{ fontWeight: 500 }}>{job.customerName}</p>
                </div>
                <div>
                    <p>Model Number</p>
                    <p style={{ fontWeight: 500 }}>{job.model}</p>
                </div>
                <div>
                    <p>Received Date</p>
                    <p style={{ fontWeight: 500 }}>{moment(job.receivedDate).format("Do MMM YY")}</p>
                </div>
                <div>
                    <p>Returned Date</p>
                    <p style={{ fontWeight: 500 }}>{moment(job.returnedDate).format("Do MMM YY")}</p>
                </div>
                <div>
                    <p>Amount</p>
                    <p style={{ fontWeight: 500 }}>{job.amount}</p>
                </div>
                <div>
                    <p>Description</p>
                    <p style={{ fontWeight: 500 }}>{job.detailedDescription}</p>
                </div>
            </Box>
        </Dialog>
    )
}

export default SingleJobDialog;