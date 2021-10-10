import CircularProgress from '@mui/material/CircularProgress';
import classes from './loadingSpinner.module.scss';
const LoadingSpinner = () => {
    return (
        <div className={`${classes.wrapper}`}>
            <CircularProgress />
        </div>
    )
}
export default LoadingSpinner;