import { Button, Box } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import "@/app/globals.css";
import "./Navbar.css";
import CitySelect from "./CitySelect";
import NotificationBell from "./NotificationBell";

const accountTypeId = 3;
const cityFilterId = null;
const networkFilterId = 2;
const fetchFilterInfo = async ( accountTypeId, cityFilterId, networkFilterId) => {

    try {
      const res = await fetch('/api/fetch-account-filters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountTypeId, cityFilterId, networkFilterId }),
      });
      if (!res.ok) throw new Error('Error fetching usage data');
      const data = await res.json();
      console.log("fetchFilterInfo preformed");
      return data;
    } catch (error) {
      console.error('Error fetching usage data:', error);
      return [];
    }
};

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