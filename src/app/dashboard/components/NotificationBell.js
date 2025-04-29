import { IconButton, Popper, Box } from "@mui/material"
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import NotificationsIcon from '@mui/icons-material/Notifications';
import React from "react";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRef } from "react";
import { Modal, Typography, Button} from '@mui/material';
import Link from "next/link";


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
    const [openModal, SetOpenModal] =useState(false);
    const [selectedNotif, setSelectedNotif] = useState(null);
    const handleNotifClick = (notif) => {
        setSelectedNotif(notif);
        SetOpenModal(true);
        markAsRead(notif.notif_id);
    }

    
    const markAsRead = async (notif_id) => {
        try {
            await fetch('api/markAsRead', {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({ notif_id }),
            });
            setNotifications((prev) => 
                prev.map((notif) => (notif.notif_id === notif_id ? { ...notif, isRead: true } : notif))
            );
        }catch (err) {
            console.error('Failed to mark as read:', err);
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
        const year = String(date.getFullYear()).slice(2); // get last 2 digits
        return `${month}/${year}`;
    };
    
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
                    <p>No New Notifications</p>
                ) : (
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {filteredNotif.map((notif, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => handleNotifClick(notif)}>
                                    <List>
                                        <ListItem
                                            style={{
                                                fontWeight: notif.isRead ? 'normal' : 'bolder',
                                            }}
                                        >{notif.type} {formatDate(notif.time)}</ListItem>
                                    </List>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
            </Popper>
            <Modal open={openModal} onClose={() => SetOpenModal(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left:'50%',
                    transform: 'translate(-50%, -50%)',
                    width:400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow:24,
                    p: 4,
                    borderRadius: 2,
                }}>
                    {selectedNotif && (
                        <>
                            <h2>Notification</h2>
                            <List sx={{gap: '20px'}}>
                                <Typography><strong>From: </strong>{selectedNotif.f_name[1]}</Typography>
                                <Typography><strong>Type: </strong>{selectedNotif.type}</Typography>
                                <Typography><strong>Message: </strong>{selectedNotif.detail}</Typography>
                                {selectedNotif.resource ? (
                                    <Typography><strong>Resource: </strong><a href={selectedNotif.resource} target="_blank" rel="noopener noreferrer">{selectedNotif.resource}</a></Typography>
                                ) : null}
                            </List>
                        </>
                        
                    )} 
                </Box>
            </Modal>
        </>
    )
}