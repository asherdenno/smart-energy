import { Button, Box } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import "@/app/globals.css";
import "./Navbar.css";
import CitySelect from "./CitySelect";
import NotificationBell from "./NotificationBell";

const Navbar = ({ title = "Add title", hasNotify = true, hasCitySelect = true }) => {
  return (
    <nav>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1>{title}</h1>
        <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
          {hasCitySelect ?
            (<CitySelect />)
            : ""}
          {hasNotify ?
            (<NotificationBell />
            ) : ""}
        </Box>
      </Box>
    </nav>
  );
}
export default Navbar;