import { IconButton, Popper, Box } from "@mui/material"
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import NotificationsIcon from '@mui/icons-material/Notifications';
import React from "react";

export default function NotificationBell() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    return (
        <>
            <IconButton aria-label="alerts" aria-describedby={id} color="" size="large"
                sx={{ border: "2px solid", borderRadius: "45%", padding: "10px", margin: "2px" }}
                onClick={handleClick}>
                <NotificationsIcon fontSize="inherit" />
            </IconButton>
            <Popper id={id} open={open} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 0, bgcolor: 'background.paper' }}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemButton>
                        <ListItemText primary="Notification 1" />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemText primary="Notification 2" />
                    </ListItemButton>
                </ListItem>
            </List>
            </Box>
            </Popper>
        </>
    )
}