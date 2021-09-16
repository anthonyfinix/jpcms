import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import UserWidget from './Components/UserWidget';
const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
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