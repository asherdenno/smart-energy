"use client"
import styles from "@/app/page.module.css";
import { useState, useContext, useEffect } from "react";
import EleGasButtons from "../charts/overview/eleGasButtons";
import AnnualEnergyData from "../charts/overview/annualEnergyData";
import EnergyUsagePercent from "../charts/overview/energyUsagePercent";
import { ToggleButton } from "@mui/material";
import DownloadButtons from "./downloadButton";
import { NavbarContext } from "../../context/NavbarContext";
import { useSession } from "next-auth/react";

export default function AnnualEnergyOverview() {
  const fetchDataFromCity = async (city_id) => {
    try {
      const res = await fetch('/api/usage-sum-per-year', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city_id, network_id: null }),
      });
      if (!res.ok) throw new Error('Error fetching usage data');
      const data = await res.json();
      console.log("Fetched graph data:", data);
      return data;
    } catch (error) {
      console.error('Error fetching usage data:', error);
      return [];
    }
  };

  const fetchDataFromNetwork = async (network_filter_id) => {
    try {
      const res = await fetch('/api/usage-sum-per-year', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city_id: null, network_id: network_filter_id }),
      });
      if (!res.ok) throw new Error('Error fetching usage data');
      const data = await res.json();
      console.log("Fetched graph data:", data);
      return data;
    } catch (error) {
      console.error('Error fetching usage data:', error);
      return [];
    }
  };

  const { annualEnergyData, setAnnualEnergyData, city, network, reloadFlag, setReloadFlag } = useContext(NavbarContext);
  const { data: session } = useSession();
  const account = session?.user;

  const fetchAndSetData = async (filter_id) => {
    const data = await fetchDataFromCity(filter_id);
    setAnnualEnergyData(data);
    console.log("Fetched data for graphs from city filter id :", filter_id);
  };

  const [showElectric, setShowElectric] = useState(true);
  const [showGas, setShowGas] = useState(true);

  const handleCityChange = async () => {
    if (!account) return;
    if (city && city.city_filter_id && (account.account_type_id === 2 || account.account_type_id === 1)) {
        setAnnualEnergyData(null);
        const data = await fetchDataFromCity(city.city_filter_id);
        setAnnualEnergyData(data);
        console.log("Fetched data for graphs from city filter id:", city.city_filter_id);
    }
  };

  const handleNetworkChange = async () => {
    if (!account) return;
    if (network && network.network_filter_id) {
        setAnnualEnergyData(null);
        const data = await fetchDataFromNetwork(network.network_filter_id);
        setAnnualEnergyData(data);
        console.log("Fetched data for graphs from network filter id:", network.network_filter_id);
    }
  };

  useEffect(() => {
    handleCityChange();
  }, [city]);

  useEffect(() => {
    handleNetworkChange();
  }
  , [network]);

  useEffect(() => {
    if (reloadFlag === false) return;
    if (!account) return;
    if (account.account_type_id === 2 || account.account_type_id === 1) {
      handleCityChange();
    }
    if (account.account_type_id === 3) {
      handleNetworkChange();
    }
    setReloadFlag(false);
  }, [reloadFlag]);

  return (
    <div>
      {/* <h>Annual Energy Consumption</h> */}
      {/* <ToddleEleGas/> */}
      <div style={{display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px"}}>
          <EleGasButtons
            showElectric={showElectric}
            setShowElectric={setShowElectric}
            showGas={showGas}
            setShowGas={setShowGas}
          />
          <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", gap: "10px", alignItems:"flex-start" }}>
            <AnnualEnergyData showElectric={showElectric} showGas={showGas} minWidth={"400px"}/>
            <EnergyUsagePercent showElectric={showElectric} showGas={showGas} minWidth={"400px"} />
          </div> 
          <h2>Generate a report:</h2>
          <DownloadButtons />
      </div>
    </div>
  );
}

