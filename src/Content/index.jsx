import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import NewServiceDialogBox from '../NewServiceDialogBox';
import http from '../util/axios';
const Content = () => {
    const [open, setOpen] = React.useState(false)
    const [services, setServices] = React.useState([]);
    const handleNewServiceDialogClose = () => setOpen(false);
    const handleNewServiceDialogOpen = () => setOpen(true);
    const createJob = async (newJob) => {
        let response = await http.post('/service', { ...newJob })
        if(!response.error) {
            handleNewServiceDialogClose();
            let response = await http.get('/service');
            setServices(response.data.result);

        }
    }
    React.useEffect(() => {
        http.get('/service').then(response => {
            setServices(response.data.result);
        })
    }, [])

    return (
        <div>
            <div>
                <Button onClick={handleNewServiceDialogOpen} variant="contained">Add New</Button>
            </div>
            <div>
                {services.map(service => {
                    return <h1>{service.customerName}</h1>
                })}
            </div>
            <NewServiceDialogBox open={open} handleClose={handleNewServiceDialogClose} createJob={createJob} />
        </div>
    )
}
export default Content;