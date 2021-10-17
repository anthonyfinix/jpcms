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
import handleSetJobs from './redux/middleware/handleSetJobs';
import updateAddNewJobDialogState from './redux/middleware/updateAddNewJobDialogState';
import handleAddJob from './redux/middleware/handleAddJob';
import handleUpdateCurrentJob from './redux/middleware/handleUpdateCurrentJob';
import handleUpdateJob from './redux/middleware/handleUpdateJob';
import updateSingleJobDialogState from './redux/middleware/updateSingleJobDialogState'
const Job = (props) => {
    const { notify } = React.useContext(SnackbarContext);
    // const [serviceError, setServiceError] = React.useState(false);
    // const [services, setServices] = React.useState([]);
    // const [searchTerm, setSearchTerm] = React.useState("");
    // const handleSearchInputChange = (e) => setSearchTerm(e.currentTarget.value);
    // const [searchResults, setSearchResults] = React.useState([]);
    // const [isLoading, setIsLoading] = React.useState(false);
    // const [page, setPage] = React.useState(1);
    const loadMoreJobs = () => {
        //     setPage(currentPage => currentPage + 1)
    };
    // const [newDialogIsOpen, setNewDialogBoxIsOpen] = React.useState(false)
    // const [singleDialogIsOpen, setSingleDialogBoxIsOpen] = React.useState(false)
    // const handleNewJobDialogClose = () => {
    //     setNewDialogBoxIsOpen(false);
    //     if (isUpdate) setIsUpdate(false)
    // };
    // const handleNewJobDialogOpen = () => setNewDialogBoxIsOpen(true);
    // const handleSingleJobDialogOpen = () => setSingleDialogBoxIsOpen(true);
    // const handleSingleJobDialogClose = () => { setSingleDialogBoxIsOpen(false); currentSelectedJobDetails.current = null; }
    // const currentSelectedJobDetails = React.useRef(null);
    const handleUpdateJob = (selectedJob) => {
        props.handleUpdateCurrentJob(selectedJob);
        props.updateAddNewJobDialogState(true)
    }
    const handleViewJob = (selectedJob) => {
        props.handleUpdateCurrentJob(selectedJob);
        props.updateSingleJobDialogState(true)
    }
    // const handleUpdateJob = async (updatedJobDetails) => {
    //     let response = await updateJob(props.company, { ...updatedJobDetails })
    //     if (!response.error) {
    //         handleNewJobDialogClose();
    //         let response = await getJobs(props.company);
    //         setServices(response.data.result);
    //         currentSelectedJobDetails.current = null;
    //     }
    //     return response;
    // }
    // const deleteJob = async () => {
    //     await http.delete(`/service/${currentSelectedJobDetails.current._id}`);
    //     let response = await getJobs(props.company, { limit: (page * 10) })
    //     setServices(response.data.result)
    // }
    // const editJob = () => {
    //     handleNewJobDialogOpen()
    //     setIsUpdate(true)
    // }
    // const handleDeleteJob = () => {
    //     deleteJob();
    // }
    // React.useEffect(() => {
    //     getSearchedJobs(props.company, searchTerm)
    //         .then(response => setSearchResults(response.data.result))
    // }, [searchTerm])
    // React.useEffect(() => {
    //     setIsLoading(true);
    //     getJobs(props.company, { page })
    //         .then(response => {
    //             let { error } = response.data;
    //             if (error) {
    //                 setServiceError(error);
    //                 return notify(error);
    //             } else {
    //                 setIsLoading(false);
    //                 setServices((services) => [...services, ...response.data.result]);
    //             }

    //         })
    // }, [page])
    React.useEffect(() => {
        if (!props.error && !props.isFetchingJobs && props.jobs.length === 0) props.handleSetJobs(props.company);
        console.log(props)
    }, [])

    return (
        <>
            {
                props.error ? <h1>{props.error}</h1> : (
                    <>
                        <JobHeader
                            addNew={() => props.updateAddNewJobDialogState(true)}
                        // handleSearch={handleSearchInputChange}
                        />
                        <JobTable
                            jobs={!!props.searchedJobs.length ? props.searchedJobs : props.jobs}
                            // selected={currentSelectedJobDetails}
                            handleViewJob={handleViewJob}
                            handleUpdate={handleUpdateJob}
                            // handleDelete={handleDeleteJob}
                            loadMore={loadMoreJobs}
                            isLoading={props.isFetchingJobs}
                        />
                        <NewJobDialogBox
                            open={props.addNewDialogState}
                            handleClose={() => props.updateAddNewJobDialogState(false)}
                            createJob={(newJob) => props.handleAddJob(props.company, newJob)}
                            updateJob={(updatedJob) => props.handleUpdateJob(props.company, updatedJob)}
                            currentJob={props.currentJob}
                        />

                        <SingleJobDialog
                            open={props.singleJobDialogState}
                            handleClose={() => props.updateSingleJobDialogState(false)}
                            job={props.currentJob}
                        />
                    </>
                )
            }
        </>
    )
}
const mapStateToProps = state => ({
    ...state.JOB,
    company: state.COMPANY.currentCompany
});
const mapDispatchToProps = {
    handleSetJobs,
    updateAddNewJobDialogState,
    handleAddJob,
    handleUpdateCurrentJob,
    handleUpdateJob,
    updateSingleJobDialogState
}
export default connect(mapStateToProps, mapDispatchToProps)(Job);