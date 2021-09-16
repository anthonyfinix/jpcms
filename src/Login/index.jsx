import React from 'react';
import { Box, Button, Paper, TextField } from "@material-ui/core";
import http from '../util/axios';
import { UserContext } from '../UserProvider';
import { useHistory } from 'react-router';

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { user, setUser } = React.useContext(UserContext);
    const login = () => {
        http.post('/user/login', { username, password }).then(response => {
            console.log(response)
            if (!response.data.error) {
                setUser(response.data.user)
            }
        })
    }
    React.useEffect(() => {
        if (user) history.push('/');
    })
    return (
        <Box padding={10}>
            <Paper>
                <Box display="flex" flexDirection="column" padding={10}>
                    <TextField label="username" value={username} variant="outlined" onChange={(e) => setUsername(e.target.value)} />
                    <TextField type="password" label="password" value={password} variant="outlined" onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={login}>Login</Button>
                </Box>

            </Paper>
        </Box>
    )
}
export default Login;