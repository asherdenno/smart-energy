import { Button, IconButton, Box } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import "@/app/globals.css";
import "./Navbar.css";
import CitySelect from "./CitySelect";
import Link from 'next/Link';

const Navbar = ({ title = "Add title", hasNotify = true, hasCitySelect = true }) => {
  return (
    <nav>
      <Link href="/dashboard/notification">Notifications</Link>
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
            (<IconButton aria-label="alerts" color="" size="large"
              sx={{ border: "2px solid", borderRadius: "45%", padding: "10px", margin: "2px" }}>
              <NotificationsIcon fontSize="inherit" />
            </IconButton>
            ) : ""}
        </Box>
      </Box>
    </nav>
  );
}
export default Navbar;