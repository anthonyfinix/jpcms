import React from 'react';
import http from '../util/axios';
import getJobs from './api/getJobs';
import NewJobDialogBox from '../Job/NewJobDialogBox';
import { SnackbarContext } from '../shared/SnackbarProvider';
import JobHeader from './Header';
import SingleJobDialog from './SingleJobDialog';
import JobTable from './Table';
import getSearchedJobs from './api/getSearchedJobs';
import updateJob from './api/updateJob';
import addJob from './api/addJob';
import { connect } from 'react-redux';
const Job = (props) => {
    const { notify } = React.useContext(SnackbarContext);
    const [serviceError, setServiceError] = React.useState(false);
    const [services, setServices] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const handleSearchInputChange = (e) => setSearchTerm(e.currentTarget.value);
    const [searchResults, setSearchResults] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const loadMoreJobs = () => {
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
        let response = await addJob(props.company, { ...newJob })
        if (!response.error) {
            handleNewJobDialogClose();
            let response = await getJobs(props.company)
            setServices(response.data.result);
            currentSelectedJobDetails.current = null;
        }
        return response;
    }
    const handleUpdateJob = async (updatedJobDetails) => {
        let response = await updateJob(props.company, { ...updatedJobDetails })
        if (!response.error) {
            handleNewJobDialogClose();
            let response = await getJobs(props.company);
            setServices(response.data.result);
            currentSelectedJobDetails.current = null;
        }
        return response;
    }
    const deleteJob = async () => {
        await http.delete(`/service/${currentSelectedJobDetails.current._id}`);
        let response = await getJobs(props.company, { limit: (page * 10) })
        setServices(response.data.result)
    }
    const handleViewJob = () => {
        handleSingleJobDialogOpen();
    }
    const editJob = () => {
        handleNewJobDialogOpen()
        setIsUpdate(true)
    }
    const handleDeleteJob = () => {
        deleteJob();
    }
    React.useEffect(() => {
        getSearchedJobs(props.company, searchTerm)
            .then(response => setSearchResults(response.data.result))
    }, [searchTerm])
    React.useEffect(() => {
        setIsLoading(true);
        getJobs(props.company, { page })
            .then(response => {
                let { error } = response.data;
                if (error) {
                    setServiceError(error);
                    return notify(error);
                } else {
                    setIsLoading(false);
                    setServices((services) => [...services, ...response.data.result]);
                }

            })
    }, [page])
    React.useEffect(() => {
        setIsLoading(true);
        getJobs(props.company)
            .then(response => {
                let { error } = response.data;
                if (error) {
                    setServiceError(error);
                    return notify(error);
                }
                setIsLoading(false);
                setServices(response.data.result);
            })
    }, [])

    return (
        <>
            {
                serviceError ? <h1>{serviceError}</h1> : (
                    <>
                        <JobHeader
                            addNew={handleNewJobDialogOpen}
                            handleSearch={handleSearchInputChange}
                        />
                        <JobTable
                            jobs={searchTerm ? searchResults : services}
                            selected={currentSelectedJobDetails}
                            handleViewJob={handleViewJob}
                            handleUpdate={editJob}
                            handleDelete={handleDeleteJob}
                            loadMore={loadMoreJobs}
                            isLoading={isLoading}
                        />
                        <NewJobDialogBox
                            open={newDialogIsOpen}
                            handleClose={handleNewJobDialogClose}
                            createJob={createJob}
                            updateJob={handleUpdateJob}
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
        </>
    )
}
const mapStateToProps = state => ({ company: state.COMPANY.currentCompany });
export default connect(mapStateToProps, null)(Job);