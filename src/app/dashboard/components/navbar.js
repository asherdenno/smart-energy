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


 export const dummyAnnualData = [
  { name: "2015", Electric: 4800, Gas: 3100, "Electric Delivery Percentage": 21, "Gas Delivery Percentage": 15, "Electric Low Tariff Consume": 38, "Gas Low Tariff Consume": 28 },
  { name: "2016", Electric: 4900, Gas: 3200, "Electric Delivery Percentage": 22, "Gas Delivery Percentage": 16, "Electric Low Tariff Consume": 39, "Gas Low Tariff Consume": 29 },
  { name: "2017", Electric: 5000, Gas: 3300, "Electric Delivery Percentage": 23, "Gas Delivery Percentage": 17, "Electric Low Tariff Consume": 40, "Gas Low Tariff Consume": 30 },
  { name: "2018", Electric: 5100, Gas: 3400, "Electric Delivery Percentage": 24, "Gas Delivery Percentage": 18, "Electric Low Tariff Consume": 41, "Gas Low Tariff Consume": 31 },
  { name: "2019", Electric: 5200, Gas: 3500, "Electric Delivery Percentage": 25, "Gas Delivery Percentage": 19, "Electric Low Tariff Consume": 42, "Gas Low Tariff Consume": 32 },
  { name: "2020", Electric: 5300, Gas: 3600, "Electric Delivery Percentage": 26, "Gas Delivery Percentage": 20, "Electric Low Tariff Consume": 43, "Gas Low Tariff Consume": 33 },
];



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