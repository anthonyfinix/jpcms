import React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import http from '../../util/axios';
import { UserContext } from '../../UserProvider';
import { useHistory } from 'react-router';
import classes from './register.module.scss';
import logo from '../../assets/vectors/logo.svg';
import { SnackbarContext } from '../../shared/SnackbarProvider';

const Register = () => {
    const history = useHistory();
    const { notify } = React.useContext(SnackbarContext);
    const [firstName, setFirstName] = React.useState("");
    const [firstNameError, setFirstNameError] = React.useState("");
    const handleFirstNameChange = (e) => {
        let value = e.currentTarget.value;
        setFirstName(value);
        (value === "") ? setFirstNameError("Should not be empty") : setFirstNameError("")
    }
    const [lastName, setLastName] = React.useState("");
    const [lastNameError, setLastNameError] = React.useState("");
    const handleLastNameChange = (e) => {
        let value = e.currentTarget.value;
        setLastName(value);
        (value === "") ? setLastNameError("Should not be empty") : setLastNameError("")
    }
    const [username, setUsername] = React.useState('');
    const [usernameError, setUsernameError] = React.useState("");
    const handleUsernameChange = (e) => {
        let value = e.currentTarget.value;
        setUsername(value);
        setUsername(value);
        (value === "") ? setUsernameError("Should not be empty") : setUsernameError("")
    }
    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState("");
    const handlePasswordChange = (e) => {
        let value = e.currentTarget.value;
        setPassword(value);
        (value === "") ? setPasswordError("Should not be empty") : setPasswordError("")
    }
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
    const handleConfirmPasswordChange = (e) => {
        let value = e.currentTarget.value;
        setConfirmPassword(value);
        (value === "") ? setConfirmPasswordError("Should not be empty") : setConfirmPasswordError("")
    }
    const { user, setUser } = React.useContext(UserContext);
    const register = () => {
        http.post('/user/register', { firstName, lastName, username, password, confirmPassword })
            .then(response => {
                if (response.data.error) notify(response.data.error)
                !response.data.error && history.push('/login')
            })
    }
    const checkPasswordMatch = () => {
        if ((password !== "") || (confirmPassword !== "")) {
            if (password !== confirmPassword) {
                setPasswordError("Password does not match")
                setConfirmPasswordError("Password does not match")
            }
            if (password === confirmPassword) {
                if (passwordError === "Password does not match") setPasswordError("");
                if (confirmPasswordError === "Password does not match") setConfirmPasswordError("");
            }
        }
        if (((password !== "") || (confirmPassword !== "")) && (password !== confirmPassword)) {
            setPasswordError("Password does not match")
            setConfirmPassword("Password does not match")
        }
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
                    error={!!firstNameError}
                    helperText={firstNameError}
                    size="small"
                    label="first Name"
                    value={firstName}
                    variant="outlined"
                    onChange={handleFirstNameChange}
                />
                <TextField
                    error={!!lastNameError}
                    helperText={lastNameError}
                    size="small"
                    label="Last Name"
                    value={lastName}
                    variant="outlined"
                    onChange={handleLastNameChange}
                />
                <TextField
                    error={!!usernameError}
                    helperText={usernameError}
                    size="small"
                    label="username"
                    value={username}
                    variant="outlined"
                    onChange={handleUsernameChange}
                />
                <TextField
                    error={!!passwordError}
                    helperText={passwordError}
                    size="small"
                    type="password"
                    label="password"
                    value={password}
                    variant="outlined"
                    onChange={handlePasswordChange}
                    onBlur={checkPasswordMatch}
                />
                <TextField
                    error={!!confirmPasswordError}
                    helperText={confirmPasswordError}
                    size="small"
                    type="password"
                    label="Confirm Password"
                    value={confirmPassword}
                    variant="outlined"
                    onChange={handleConfirmPasswordChange}
                    onBlur={checkPasswordMatch}
                />
                <Button variant="contained" onClick={register}>Register</Button>
                <p onClick={() => history.push('/login')}>login ?</p>
            </Paper>
        </Box>
    )
}
export default Register;