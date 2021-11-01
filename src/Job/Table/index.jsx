import React from 'react';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import classes from './table.module.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { WindowWidthContext } from '../../WindowWidthProvider';
import { connect } from 'react-redux';
import openUpdateJobDialog from '../redux/action/openUpdateJobDialog';
import openSingleJobDialog from '../redux/action/openSingleJobDialog';
import handleDeleteJob from '../redux/middleware/handleDeleteJob';
import handleNextPage from '../redux/middleware/handleNextPage';

class JobTable extends React.Component {
    static contextType = WindowWidthContext;
    constructor(props) {
        super(props)
        this.state = {
            currentRowEl: null,
            selectedRow: null,
        }
        this.scrollElement = React.createRef(null);
        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.handleView = this.handleView.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleOnScrollEnd = this.handleOnScrollEnd.bind(this);
        this.scrollObserver = React.createRef(null);
    }
    componentDidMount() {
        if (this.scrollElement.current) {
            this.scrollObserver.current = new IntersectionObserver((entries) => this.handleOnScrollEnd(entries[0]), { threshold: 1 });
            this.scrollObserver.current.observe(this.scrollElement.current);
        }
    }
    handleOnScrollEnd(entry) {
        // console.log("intersecting", entry.isIntersecting)
        if (entry.isIntersecting && !this.props.isLoading) this.props.handleNextPage(this.props.company, this.props.page, this.props.jobs)
        // if(entry.isIntersecting && !props.isLoading) props.handleNextPage(props.company, props.page, props.jobs)
        // entry.isIntersecting && !props.isLoading && props.handleNextPage(props.company, props.page, props.jobs)
    };
    // const [selectedRow, setSelectedRow] = React.useState(null)
    // const [scrollElement, setScrollElement] = React.useState(null);
    // const { width } = React.useContext(WindowWidthContext);
    // const [currentRowEl, setCurrentRowEl] = React.useState(null);
    handleOptionClick(e, job) {
        this.setState({
            currentRowEl: e.target,
            selectedRow: job
        })
    }
    handleView() {
        this.props.viewSingleJob(this.state.selectedRow)
        this.setState({ currentRowEl: null });
    }
    handleUpdate() {
        this.props.viewUpdateDialog(this.state.selectedRow)
        // props.handleUpdate(selectedRow)
        this.setState({ currentRowEl: null, selectedRow: null });
    }
    handleDelete() {
        this.props.handleDeleteJob(this.props.company, this.state.selectedRow._id)
        this.setState({ currentRowEl: null })
    }
    // React.useEffect(() => scrollElement && scrollObserver.current.observe(scrollElement), [scrollElement]);
    // if (props.isSearching) return <LoadingSpinner />
    render() {
        let { width } = this.context;
        return (
            <>
                <TableContainer className={`${classes.wrapper}`} id="table_wrapper">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={`${classes.cell} ${classes.th}`}>Customer Name</TableCell>
                                {(width > 600) && <TableCell className={`${classes.cell} ${classes.th}`}>Serial Number</TableCell>}
                                {(width > 600) && <TableCell className={`${classes.cell} ${classes.th}`}>Rec Date</TableCell>}
                                {(width > 600) && <TableCell className={`${classes.cell} ${classes.th}`}>Ret Date</TableCell>}
                                {(width > 600) && <TableCell className={`${classes.cell} ${classes.th}`}>Amount</TableCell>}
                                <TableCell className={`${classes.cell} ${classes.th}`}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(this.props.searchedJobs.length ? this.props.searchedJobs : this.props.jobs).map((job) => (
                                <TableRow key={job._id}>
                                    <TableCell className={classes.td} component="th" scope="row">{job.customerName}</TableCell>
                                    {(width > 600) && <TableCell className={`${classes.cell} ${classes.th}`}>{job.serialNumber}</TableCell>}
                                    {(width > 600) && <TableCell className={`${classes.cell} ${classes.th}`}>{moment(job.receivedDate).format("Do MMM YY")}</TableCell>}
                                    {(width > 600) && <TableCell className={`${classes.cell} ${classes.th}`}>{moment(job.returnedDate).format("Do MMM YY")}</TableCell>}
                                    {(width > 600) && <TableCell className={`${classes.cell} ${classes.th}`}>{job.amount}</TableCell>}
                                    <TableCell className={`${classes.td} ${classes.opt_cell}`} component="th" scope="row"><MoreVertIcon onClick={(e) => this.handleOptionClick(e, job)} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div ref={(el) => this.scrollElement.current = el} className={`${classes.loadingWrapper}`}> {this.props.isLoading && <LoadingSpinner />} </div>
                </TableContainer>

                <Menu
                    id="simple-menu"
                    anchorEl={this.state.currentRowEl}
                    keepMounted
                    open={Boolean(this.state.currentRowEl)}
                    onClose={() => this.setState({ currentRowEl: null })}
                >
                    <MenuItem onClick={this.handleView}>View</MenuItem>
                    <MenuItem onClick={this.handleUpdate}>Update</MenuItem>
                    <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
                </Menu>
            </>
        )
    }
}
const mapStateToProps = state => ({
    isSearching: state.JOB.isSearchingJobs,
    isLoading: state.JOB.isFetchingJobs,
    company: state.COMPANY.currentCompany,
    jobs: state.JOB.jobs,
    searchedJobs: state.JOB.searchedJobs,
    page: state.JOB.currentPage
});
const mapDispatchToProps = {
    viewUpdateDialog: (job) => dispatch => dispatch(openUpdateJobDialog(job)),
    viewSingleJob: (job) => (dispatch) => dispatch(openSingleJobDialog(job)),
    handleDeleteJob,
    handleNextPage
}
export default connect(mapStateToProps, mapDispatchToProps)(JobTable);