import { Button, IconButton } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import "@/app/globals.css";
import "./Navbar.css";

const Navbar = ({ title = "Add title", hasNotify = false }) => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h1>{title}</h1>
      {hasNotify ?
        (<IconButton aria-label="alerts" color="" size="large" 
            sx={{ border: "2px solid", borderRadius: "45%", padding: "8px" }}>
          <NotificationsIcon fontSize="inherit" />
        </IconButton>
        ) : ""}
    </div>
  );
}
export default Navbar;