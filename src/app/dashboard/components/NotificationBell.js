import { IconButton, Popper, Box } from "@mui/material"
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import NotificationsIcon from '@mui/icons-material/Notifications';
import React from "react";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRef } from "react";



export default function NotificationBell() {
    const [allNotif, setAllNotif] = useState([]);
    const [filteredNotif, setFilteredNotif] = useState([]);
    const { data:session } = useSession();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    // const notifButton = useRef(null);

    // const handleClickNotif = () => {
    //     if (notifButton.current) {
    //         notifButton.current.style.color = '#f4eebb';
    //     }
    // }

    useEffect(() => {
        fetch('/api/fetchNotifications')
            .then(res => res.json())
            .then(data => {
                console.log('Fetch in frontend:', data)
                setAllNotif(data)
            })
            .catch (err => console.error('Fetch error:', err));
    }, []);

    useEffect(() => {
        const userFName= session?.user?.name;
        const userNotif = allNotif.filter(
            notif => notif.f_name[0] === userFName
        );
        setFilteredNotif(userNotif);
    }, [session, allNotif]);

    return (
        <>  
            
            <IconButton aria-label="alerts" aria-describedby={id} color="" size="large"
                sx={{ border: "2px solid", borderRadius: "45%", padding: "10px", margin: "2px" }}
                onClick={handleClick}>
                <NotificationsIcon fontSize="inherit" />
            </IconButton>
            <Popper id={id} open={open} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 0, bgcolor: 'background.paper' }}>
                {filteredNotif.length === 0 ? (
                    <ListItemText>No New Notifications</ListItemText>
                ) : (
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {filteredNotif.map((notif, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton >
                                    <ListItemText>{notif.type}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
            </Popper>
        </>
    )
}