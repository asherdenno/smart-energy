import { Button, Box } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import "@/app/globals.css";
import "./Navbar.css";
import CitySelect from "./CitySelect";
import NetworkSelect from "./NetworkSelect";
import NotificationBell from "./NotificationBell";
import { useContext, useEffect } from "react";
import YearRangeFilter from "./YearRangeFilter";
import { NavbarContext } from "../context/NavbarContext";

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


const Navbar = ({ title = "Add title", hasNetworkSelect = true, hasCitySelect = true, hasNotify = true }) => {

  useEffect(() => {
    const data = fetchFilterInfo(3, null, 2);
    console.log("useeffect preformed");
    localStorage.setItem("filteredData", JSON.stringify(data));
    console.log("stored data", data);
    }, [])
  return (
    <nav>
      {/* <YearRangeFilter/> */}
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1>{title}</h1>
        <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
          {hasNetworkSelect ?
            (<NetworkSelect />)
            : ""}
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