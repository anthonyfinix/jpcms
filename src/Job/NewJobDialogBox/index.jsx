import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import moment from "moment";
import classes from './newJobDialogBox.module.scss'

const NewJobDialogBox = ({ open, handleClose, createJob, selected, updateJob, isUpdate }) => {
    // customer
    const [customerName, setCustomerName] = React.useState('');
    const [customerNameError, setCustomerNameError] = React.useState("")
    const handleCustomerNameChange = (e) => {
        let value = e.currentTarget.value;
        (value === "") ? setCustomerNameError("Should not be empty") : setCustomerNameError("");
        setCustomerName(value);
    }
    const [serialNumber, setSerialNumber] = React.useState('');
    // model
    const [model, setModel] = React.useState('')
    const [modelError, setModelError] = React.useState('')
    const handleModelChange = (e) => {
        let value = e.currentTarget.value;
        (value === "") ? setModelError("Should not be empty") : setModelError("");
        setModel(value);
    }
    // issue
    const [issues, setIssues] = React.useState('')
    const [issueError, setIssueError] = React.useState('')
    const handleIssueChange = (e) => {
        let value = e.currentTarget.value;
        (value === "") ? setIssueError("Should not be empty") : setIssueError("");
        setIssues(value);
    }
    // brand
    const [brand, setBrand] = React.useState('')
    const [brandError, setBrandError] = React.useState('')
    const handleBrandChange = (e) => {
        let value = e.currentTarget.value;
        (value === "") ? setBrandError("Should not be empty") : setBrandError("");
        setBrand(value);
    }
    //status
    const [status, setStatus] = React.useState(false);
    const handleStatusChange = (e) => {
        let value = e.target.value;
        if (value === 'resolved') return setStatus(true)
        setStatus(false)
    };
    // amount
    const [amount, setAmount] = React.useState('')
    const [amountError, setAmountError] = React.useState('')
    const handleAmountChange = (e) => {
        let value = e.currentTarget.value;
        (value === "") ? setAmountError("Should not be empty") : setAmountError("");
        setAmount(value);
    }
    const [receivedDate, setReceivedDate] = React.useState(`${moment().format("YYYY")}-${moment().format("MM")}-${moment().format("DD")}`);
    const [returnedDate, setReturnedDate] = React.useState(`${moment().format("YYYY")}-${moment().format("MM")}-${moment().format("DD")}`);
    const [detailedDescription, setDetailedDescription] = React.useState('');
    const handleReceivedDateChange = (e) => setReceivedDate(e.target.value);
    const handleReturnedDateChange = (e) => setReturnedDate(e.target.value);
    const resetInputs = () => {
        setCustomerName("")
        setSerialNumber("")
        setModel("")
        setIssues("")
        setBrand("")
        setStatus(false)
        setAmount("")
        setReceivedDate(`${moment().format("YYYY")}-${moment().format("MM")}-${moment().format("DD")}`)
        setReturnedDate(`${moment().format("YYYY")}-${moment().format("MM")}-${moment().format("DD")}`)
        setDetailedDescription("")
    }
    const handleSubmit = () => {
        if (isUpdate) {
            handleJobUpdate().then(() => resetInputs())
        } else {
            handleJobCreate().then(() => resetInputs())
        }
    }
    const handleDialogClose = () => {
        resetInputs();
        handleClose();
    }
    const handleJobCreate = () => createJob({ customerName, serialNumber, model, issues, brand, status, amount, receivedDate, returnedDate, detailedDescription });
    const handleJobUpdate = () => updateJob({ id: selected._id, customerName, serialNumber, model, issues, brand, status, amount, receivedDate, returnedDate, detailedDescription });
    React.useEffect(() => {
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
        <Dialog open={open} fullWidth={true} onClose={handleDialogClose}>
            <div className={`${classes.main_wrapper}`}>
                <TextField
                    error={!!customerNameError}
                    helperText={customerNameError}
                    size="small"
                    value={customerName}
                    onChange={handleCustomerNameChange}
                    label="Customer Name"
                    variant="outlined"
                />
                <TextField size="small" value={serialNumber} onChange={e => setSerialNumber(e.target.value)} label="Serial Number" variant="outlined" type="number" />
                <TextField error={!!modelError} helperText={modelError} size="small" value={model} onChange={handleModelChange} label="Model" variant="outlined" />
                <TextField error={!!issueError} helperText={issueError} size="small" value={issues} onChange={handleIssueChange} label="Issues" variant="outlined" />
                <TextField error={!!brandError} helperText={brandError} size="small" value={brand} onChange={handleBrandChange} label="Brand" variant="outlined" />
                <FormControl variant="outlined" size="small">
                    <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                    <Select value={status === true ? "resolved" : "returned"} onChange={handleStatusChange}>
                        <MenuItem value="resolved">Resolved</MenuItem>
                        <MenuItem value="returned">Return</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    error={!!amountError}
                    helperText={amountError}
                    type="number"
                    size="small"
                    value={amount}
                    onChange={handleAmountChange}
                    label="Amount"
                    variant="outlined"
                />
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
                <div className={classes.actionWrapper}>
                    <Button onClick={handleDialogClose}> Close </Button>
                    <Button
                        disabled={!!(modelError || customerNameError || issueError || amountError)}
                        variant="contained"
                        onClick={handleSubmit}>
                        {isUpdate ? "Update" : "Add New Job"}
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}
export default NewJobDialogBox;