import React, { forwardRef } from 'react';
import http from '../util/axios';
import NewJobDialogBox from '../Job/NewJobDialogBox';
import { DataGrid } from '@mui/x-data-grid';
import JobHeader from './Header';
import classes from './job.module.css'
import MaterialTable from 'material-table';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Menu, MenuItem } from '@material-ui/core'
import moment from 'moment';
const Job = () => {
    const [isUpdate, setIsUpdate] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [services, setServices] = React.useState([]);
    const handleNewJobDialogClose = () => {
        setOpen(false);
        if(isUpdate) setIsUpdate(false)
    };
    const handleNewJobDialogOpen = () => setOpen(true);
    const selectedRowRef = React.useRef(null);
    const [currentSelectedRowRef, setCurrentSelectedRowRef] = React.useState(null)
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };
    const createJob = async (newJob) => {
        let response = await http.post('/service', { ...newJob })
        if (!response.error) {
            handleNewJobDialogClose();
            let response = await http.get('/service');
            setServices(response.data.result);
        }
    }
    const updateJob = async (updatedJob) => {
        let response = await http.put('/service', { ...updatedJob })
        if (!response.error) {
            handleNewJobDialogClose();
            let response = await http.get('/service');
            setServices(response.data.result);
            selectedRowRef.current = null;
        }
        setIsUpdate(false)
    }
    const columns = [
        { field: 'customerName', title: "Customer Name", },
        { field: "serialNumber", title: "Sr.No", },
        { field: "model", title: "Model", },
        // { field: "issue", title: "Issue", },
        // { field: "brand", title: "Brand", width: 120,},
        { field: "receivedDate", title: "Rec Date", },
        { field: "returnedDate", title: "Ret Date", },
        // { field: "detailedDescription", title: "Description", },
        { field: "amount", title: "Amount" },
    ]
    const filterColumns = (jobs) => {
        let rows = jobs.map(job => {
            return {
                id: job._id,
                serialNumber: job.serialNumber,
                customerName: job.customerName,
                model: job.model,
                issue: job.issues,
                brand: job.brand,
                receivedDate: moment(job.receivedDate).format("Do MMM YY"),
                returnedDate: moment(job.returnedDate).format("Do MMM YY"),
                detailedDescription: job.detailedDescription,
                amount: job.amount
            }
        })
        // console.log(rows)
        return rows;
    }
    const handleEdit = () => {
        setCurrentSelectedRowRef(null);
        handleNewJobDialogOpen()
        setIsUpdate(true)
    }
    const handleDelete = async () => {
        await http.delete(`/service/${selectedRowRef.current._id}`);
        let response = await http.get('/service')
        setServices(response.data.result)
        setCurrentSelectedRowRef(null)
    }
    React.useEffect(() => {
        http.get('/service').then(response => {
            setServices(response.data.result);
        })
    }, [])

    return (
        <div className={classes.content}>
            <JobHeader addNew={handleNewJobDialogOpen} />
            <MaterialTable
                options={{ search: false, showTitle: false, toolbar: false }}
                icons={tableIcons}
                className={classes.wrapper}
                columns={columns}
                data={filterColumns(services)}
                actions={[
                    {
                        icon: () => <MoreVertIcon />,
                        tooltip: 'Save User',
                        onClick: (event, rowData) => {
                            setCurrentSelectedRowRef(event.target)
                            http.get(`/service/${rowData.id}`).then(response => {
                                selectedRowRef.current = response.data.result;
                            })
                        }
                    }
                ]}
            />
            <NewJobDialogBox
                open={open}
                handleClose={handleNewJobDialogClose}
                createJob={createJob}
                updateJob={updateJob}
                selected={selectedRowRef.current}
                isUpdate={isUpdate}
            />
            <Menu
                id="simple-menu"
                anchorEl={currentSelectedRowRef}
                keepMounted
                open={Boolean(currentSelectedRowRef)}
                onClose={() => setCurrentSelectedRowRef(null)}
            >
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                <MenuItem onClick={handleEdit}>Update</MenuItem>
            </Menu>
        </div>
    )
}
export default Job;