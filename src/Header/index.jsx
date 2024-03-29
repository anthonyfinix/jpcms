import React from 'react';
import { AppContext } from '../App/AppProvider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import UserWidget from './UserWidget';
const Header = () => {
    const {setIsSidebarOpen,isSidebarOpen} = React.useContext(AppContext);
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={()=>setIsSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" >
                    JPCMS
                </Typography>
                <UserWidget style={{marginLeft:"auto"}} />
            </Toolbar>
        </AppBar>
    )
}
export default Header;