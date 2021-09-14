import { Dialog, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@material-ui/core";
import React, { useEffect } from 'react';
import moment from "moment";

const NewJobDialogBox = ({ open, handleClose, createJob, selected, updateJob, isUpdate }) => {
    const [customerName, setCustomerName] = React.useState('')
    const [serialNumber, setSerialNumber] = React.useState('')
    const [model, setModel] = React.useState('')
    const [issues, setIssues] = React.useState('')
    const [brand, setBrand] = React.useState('')
    const [status, setStatus] = React.useState(false);
    const [amount, setAmount] = React.useState('')
    const [receivedDate, setReceivedDate] = React.useState(`${moment().format("YYYY")}-${moment().format("MM")}-${moment().format("DD")}`);
    const [returnedDate, setReturnedDate] = React.useState(`${moment().format("YYYY")}-${moment().format("MM")}-${moment().format("DD")}`);
    const [detailedDescription, setDetailedDescription] = React.useState('');
    const handleReceivedDateChange = (e) => {
        console.log('LOCAL', e.target.value)
        setReceivedDate(e.target.value)
    };
    const handleReturnedDateChange = (e) => setReturnedDate(e.target.value);
    const handleStatusChange = (e) => setStatus(e.target.value === "resolved" ? true : false)
    const handleSubmit = () => {
        let job = { customerName, serialNumber, model, issues, brand, status, amount, receivedDate, returnedDate, detailedDescription }
        createJob(job);
    }
    const handleUpdate = () => {
        updateJob({ id: selected._id, customerName, serialNumber, model, issues, brand, status, amount, receivedDate, returnedDate, detailedDescription })
    }
    useEffect(() => {
        if (isUpdate && selected) {
            setCustomerName(selected.customerName);
            setSerialNumber(selected.serialNumber);
            setModel(selected.model);
            setIssues(selected.issues);
            setBrand(selected.brand);
            setStatus(selected.status);
            setAmount(selected.amount);
            setReceivedDate(`${moment(selected.receivedDate).format('YYYY')}-${moment(selected.receivedDate).format("MM")}-${moment(selected.receivedDate).format("DD")}`);
            setReturnedDate(`${moment(selected.returnedDate).format("YYYY")}-${moment(selected.returnedDate).format("MM")}-${moment(selected.returnedDate).format("DD")}`);
            setDetailedDescription(selected.detailedDescription);
        }
    }, [isUpdate])
    return (
        <Dialog open={open} onClose={handleClose}>
            <div className="add-new-service-wrapper">
                <TextField size="small" value={customerName} onChange={e => setCustomerName(e.target.value)} label="Customer Name" variant="outlined" />
                <TextField size="small" value={serialNumber} onChange={e => setSerialNumber(e.target.value)} label="Serial Number" variant="outlined" type="number" />
                <TextField size="small" value={model} onChange={e => setModel(e.target.value)} label="Model" variant="outlined" />
                <TextField size="small" value={issues} onChange={e => setIssues(e.target.value)} label="Issues" variant="outlined" />
                <TextField size="small" value={brand} onChange={e => setBrand(e.target.value)} label="Brand" variant="outlined" />
                <FormControl variant="outlined" size="small">
                    <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                    <Select value={status === true ? "resolved" : "returned"} onChange={handleStatusChange}>
                        <MenuItem value="resolved">Resolved</MenuItem>
                        <MenuItem value="returned">Return</MenuItem>
                    </Select>
                </FormControl>
                <TextField size="small" value={amount} onChange={e => setAmount(e.target.value)} label="Amount" variant="outlined" />
                <TextField
                    id="date"
                    label="Received Date"
                    type="date"
                    defaultValue={receivedDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleReceivedDateChange}
                />
                <TextField
                    id="date"
                    label="Returned Date"
                    type="date"
                    defaultValue={returnedDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleReturnedDateChange}
                />
                <TextField value={detailedDescription} onChange={e => setDetailedDescription(e.target.value)} size="small" label="Detailed Description" multiline variant="outlined" />
                {isUpdate ? <Button onClick={handleUpdate}>Update</Button> : <Button onClick={handleSubmit}>Add New Job</Button>}
            </div>
        </Dialog>
    )
}
export default NewJobDialogBox;