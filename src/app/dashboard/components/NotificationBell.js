import { IconButton, Popper } from "@mui/material"
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function NotificationBell() {
    return (
        <>
            <IconButton aria-label="alerts"color="" size="large"
                sx={{ border: "2px solid", borderRadius: "45%", padding: "10px", margin: "2px" }}
                >
                <NotificationsIcon fontSize="inherit" />
            </IconButton>
            {/* <Popper id={id} open={open} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
            The content of the Popper.
            </Box>
            </Popper> */}
        </>
    )
}