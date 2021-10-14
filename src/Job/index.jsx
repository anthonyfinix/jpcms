import React from 'react';
import http from '../util/axios';
import getJobs from './api/getJobs';
import NewJobDialogBox from '../Job/NewJobDialogBox';
import { SnackbarContext } from '../shared/SnackbarProvider';
import JobHeader from './Header';
import SingleJobDialog from './SingleJobDialog';
import JobTable from './Table';
import getSearchedJobs from './api/getSearchedJobs';
import addJob from './api/addJob';
const Job = () => {
    const { notify } = React.useContext(SnackbarContext)
    const [services, setServices] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const handleSearchInputChange = (e) => setSearchTerm(e.currentTarget.value);
    const [searchResults, setSearchResults] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const loadMoreJobs = () => {
        console.log('load more')
        setPage(currentPage => currentPage + 1)
    };
    const [isUpdate, setIsUpdate] = React.useState(false)
    const [newDialogIsOpen, setNewDialogBoxIsOpen] = React.useState(false)
    const [singleDialogIsOpen, setSingleDialogBoxIsOpen] = React.useState(false)
    const handleNewJobDialogClose = () => {
        setNewDialogBoxIsOpen(false);
        if (isUpdate) setIsUpdate(false)
    };
    const handleNewJobDialogOpen = () => setNewDialogBoxIsOpen(true);
    const handleSingleJobDialogOpen = () => setSingleDialogBoxIsOpen(true);
    const handleSingleJobDialogClose = () => { setSingleDialogBoxIsOpen(false); currentSelectedJobDetails.current = null; }
    const currentSelectedJobDetails = React.useRef(null);
    const createJob = async (newJob) => {
        let response = await addJob({ ...newJob })
        if (!response.error) {
            handleNewJobDialogClose();
            let response = await getJobs()
            setServices(response.data.result);
            currentSelectedJobDetails.current = null;
        }
        return response;
    }
    const updateJob = async (updatedJob) => {
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
        let response = await getJobs({ limit: (page * 10) })
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
        getSearchedJobs(searchTerm)
            .then(response => setSearchResults(response.data.result))
    }, [searchTerm])
    React.useEffect(() => {
        setIsLoading(true);
        getJobs({ page })
            .then(response => {
                let { error } = response;
                if (error) return notify(error);
                setIsLoading(false);
                setServices((services) => [...services, ...response.data.result]);

            })
    }, [page])
    React.useEffect(() => {
        setIsLoading(true);
        getJobs()
            .then(response => {
                let { error } = response;
                if (error) return notify(error);
                setIsLoading(false);
                setServices(response.data.result);
            })
    }, [])

    return (
        <>
            <JobHeader
                addNew={handleNewJobDialogOpen}
                handleSearch={handleSearchInputChange}
            />
            <JobTable
                jobs={searchTerm ? searchResults : services}
                selected={currentSelectedJobDetails}
                handleViewJob={handleViewJob}
                handleUpdate={handleUpdateJob}
                handleDelete={handleDeleteJob}
                loadMore={loadMoreJobs}
                isLoading={isLoading}
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