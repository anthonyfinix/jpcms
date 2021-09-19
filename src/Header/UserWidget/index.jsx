import React from "react";
import { UserContext } from "../../UserProvider";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const UserWidget = ({ children, className, ...props }) => {
    const { user, setUser } = React.useContext(UserContext);
    const history = useHistory()
    const handleMenuClick = (event) => {
        if (!user) return history.push('/login');
        setAnchorEl(event.currentTarget)
    }
    const handleLogoutClick = () => {
        setUser(null)
        localStorage.removeItem("JPtechSolutionAccessToken");
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClose = () => setAnchorEl(null);
    return (
        <div  {...props}>
            <IconButton onClick={handleMenuClick}>
                <AccountCircleIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                {user && <MenuItem onClick={handleMenuClose}>{user.username}</MenuItem>}
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
        </div>
    )
}
export default UserWidget;