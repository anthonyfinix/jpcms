import React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import http from '../util/axios';
import { UserContext } from '../UserProvider';
import { useHistory } from 'react-router';
import classes from './login.module.scss';
import logo from '../assets/vectors/logo.svg';

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { user, setUser } = React.useContext(UserContext);
    const login = () => {
        http.post('/user/login', { username, password })
            .then(response => !response.data.error && setUser(response.data.user))
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
                    label="username"
                    value={username}
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    size="small"
                    type="password"
                    label="password"
                    value={password}
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" onClick={login}>Login</Button>
            </Paper>
        </Box>
    )
}
export default Login;