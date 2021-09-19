import React from 'react';
import classes from './sidebar.module.scss';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { AppContext } from '../App/AppProvider';
const Sidebar = () => {
    const { isSidebarOpen } = React.useContext(AppContext);
    return (
        <div className={`${classes.wrapper} ${isSidebarOpen ? classes.show : classes.hidden}`}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="Jobs" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    )
}
export default Sidebar;