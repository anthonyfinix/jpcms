import React from 'react';
import http from '../util/axios';
import NewJobDialogBox from '../Job/NewJobDialogBox';
import JobHeader from './Header';
import SingleJobDialog from './SingleJobDialog';
import JobTable from './Table';
const Job = () => {
    const [page, setPage] = React.useState(1);
    const loadMoreJobs = () => { console.log("Loading"); setPage(page + 1) };
    const [isUpdate, setIsUpdate] = React.useState(false)
    const [newDialogIsOpen, setNewDialogBoxIsOpen] = React.useState(false)
    const [singleDialogIsOpen, setSingleDialogBoxIsOpen] = React.useState(false)
    const [services, setServices] = React.useState([]);
    const handleNewJobDialogClose = () => {
        setNewDialogBoxIsOpen(false);
        if (isUpdate) setIsUpdate(false)
    };
    const handleNewJobDialogOpen = () => setNewDialogBoxIsOpen(true);
    const handleSingleJobDialogOpen = () => setSingleDialogBoxIsOpen(true);
    const handleSingleJobDialogClose = () => { setSingleDialogBoxIsOpen(false); currentSelectedJobDetails.current = null; }
    const currentSelectedJobDetails = React.useRef(null);
    const createJob = async (newJob) => {
        let response = await http.post('/service', { ...newJob })
        console.log(response)
        if (!response.error) {
            handleNewJobDialogClose();
            let response = await http.get('/service');
            setServices(response.data.result);
            currentSelectedJobDetails.current = null;
        }
        return response;
    }
    const updateJob = async (updatedJob) => {
        console.log("Update Job")
        console.log(updateJob)
        let response = await http.put('/service', { ...updatedJob })
        if (!response.error) {
            handleNewJobDialogClose();
            let response = await http.get('/service');
            setServices(response.data.result);
            currentSelectedJobDetails.current = null;
        }
        return response;
    }
    const deleteJob = async () => {
        await http.delete(`/service/${currentSelectedJobDetails.current._id}`);
        let response = await http.get('/service')
        setServices(response.data.result)
    }
    const handleViewJob = () => {
        handleSingleJobDialogOpen();
    }
    const handleUpdateJob = () => {
        handleNewJobDialogOpen()
        setIsUpdate(true)
    }
    const handleDeleteJob = () => {
        deleteJob();
    }
    React.useEffect(() => {
        http.get('/service', { params: { page } }).then(response => {
            setServices((services) => [...services, ...response.data.result])
        })
    }, [page])
    React.useEffect(() => {
        http.get('/service', { params: { page } }).then(response => {
            setServices(response.data.result);
        })
    }, [])

    return (
        <>
            <JobHeader addNew={handleNewJobDialogOpen} />
            <JobTable
                jobs={services}
                selected={currentSelectedJobDetails}
                handleViewJob={handleViewJob}
                handleUpdate={handleUpdateJob}
                handleDelete={handleDeleteJob}
                loadMore={loadMoreJobs}
            />
            <NewJobDialogBox
                open={newDialogIsOpen}
                handleClose={handleNewJobDialogClose}
                createJob={createJob}
                updateJob={updateJob}
                selected={currentSelectedJobDetails.current}
                isUpdate={isUpdate}
            />
            <SingleJobDialog
                open={singleDialogIsOpen}
                handleClose={handleSingleJobDialogClose}
                job={currentSelectedJobDetails.current}
            />
        </>
    )
}
export default Job;