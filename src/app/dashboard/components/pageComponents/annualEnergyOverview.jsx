"use client"
import styles from "@/app/page.module.css";
import { useState, useContext, useEffect } from "react";
import EleGasButtons from "../charts/overview/eleGasButtons";
import AnnualEnergyData from "../charts/overview/annualEnergyData";
import EnergyUsagePercent from "../charts/overview/energyUsagePercent";
import { ToggleButton } from "@mui/material";
import DownloadButtons from "./downloadButton";
import GasElectricKey from "../charts/overview/gasElectricKey";
import { NavbarContext } from "../../context/NavbarContext";

export default function AnnualEnergyOverview() {
  const fetchData = async (city_id) => {
    try {
      const res = await fetch('/api/usage-sum-per-year', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city_id }),
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

  const { annualEnergyData, setAnnualEnergyData, city } = useContext(NavbarContext);

  const fetchAndSetData = async (filter_id) => {
    const data = await fetchData(filter_id);
    setAnnualEnergyData(data);
    console.log("Fetched data for graphs from city filter id :", filter_id);
  };

  const [showElectric, setShowElectric] = useState(true);
  const [showGas, setShowGas] = useState(true);

  useEffect(() => {
    if (city && city.city_filter_id) {
      fetchAndSetData(city.city_filter_id);
    }
  }, [city]);

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
          <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", gap: "10px", }}>
            <AnnualEnergyData showElectric={showElectric} showGas={showGas} minWidth={"400px"}/>
            <EnergyUsagePercent showElectric={showElectric} showGas={showGas} minWidth={"400px"} />
          </div> 
          <DownloadButtons />
      </div>
    </div>
  );
}

