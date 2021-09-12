import { Dialog, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@material-ui/core";
import React from 'react';

const NewServiceDialogBox = ({ open, handleClose, createJob }) => {
    const [customerName, setCustomerName] = React.useState('')
    const [serialNumber, setSerialNumber] = React.useState('')
    const [model, setModel] = React.useState('')
    const [issues, setIssues] = React.useState('')
    const [brand, setBrand] = React.useState('')
    const [status, setStatus] = React.useState(false);
    const [amount, setAmount] = React.useState('')
    const [receivedDate, setReceivedDate] = React.useState();
    const [returnedDate, setReturnedDate] = React.useState();
    const [detailedDescription, setDetailedDescription] = React.useState('');
    const handleReceivedDateChange = (e) => setReceivedDate(e.target.value);
    const handleReturnedDateChange = (e) => setReturnedDate(e.target.value);
    const handleStatusChange = (e) => setStatus(e.target.value === "resolved" ? true : false)
    const handleSubmit = () => {
        let job = { customerName, serialNumber, model, issues, brand, status, amount, receivedDate, returnedDate, detailedDescription }
        createJob(job);
    }
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
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleReceivedDateChange}
                />
                <TextField
                    id="date"
                    label="Returned Date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleReturnedDateChange}
                />
                <TextField value={detailedDescription} onChange={e => setDetailedDescription(e.target.value)} size="small" label="Detailed Description" multiline variant="outlined" />
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </Dialog>
    )
}
export default NewServiceDialogBox;