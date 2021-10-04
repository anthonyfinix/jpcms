import React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import http from '../util/axios';
import { UserContext } from '../UserProvider';
import { useHistory } from 'react-router';
import classes from './register.module.scss';
import logo from '../assets/vectors/logo.svg';
import { SnackbarContext } from '../shared/SnackbarProvider';

const Register = () => {
    const history = useHistory();
    const { notify } = React.useContext(SnackbarContext)
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState("");
    const [confirmPassword, setConfirmPPassword] = React.useState('');
    const { user, setUser } = React.useContext(UserContext);
    const register = () => {
        http.post('/user/register', { firstName, lastName, username, password, confirmPassword })
            .then(response => {
                if (response.data.error) notify(response.data.error)
                !response.data.error && history.push('/login')
            })
    }
    const checkPasswordMatch = (e) => {
    }
    React.useEffect(() => {
        if (user) history.push('/');
    })
    return (
        <Box className={`${classes.main_wrapper} m-md`}>
            <div className={`${classes.brand_wrapper}`}>
                <img src={`${logo}`} alt="logo" />
                <Typography>Catalog</Typography>
            </div>
            <Paper className={classes.wrapper}>
                <TextField
                    size="small"
                    label="first Name"
                    value={firstName}
                    variant="outlined"
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    size="small"
                    label="Last Name"
                    value={lastName}
                    variant="outlined"
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    size="small"
                    label="username"
                    value={username}
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    error={!!passwordError}
                    helperText={passwordError}
                    size="small"
                    type="password"
                    label="password"
                    value={password}
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={checkPasswordMatch}
                />
                <TextField
                    size="small"
                    type="password"
                    label="Confirm Password"
                    value={confirmPassword}
                    variant="outlined"
                    onChange={(e) => setConfirmPPassword(e.target.value)}
                />
                <Button variant="contained" onClick={register}>Register</Button>
                <p onClick={() => history.push('/login')}>login ?</p>
            </Paper>
        </Box>
    )
}
export default Register;