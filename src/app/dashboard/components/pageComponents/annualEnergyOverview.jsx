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
  // const fetchData = async (city_id) => {
  //   try {
  //     const res = await fetch('/api/usage-sum-per-year', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ city_id }),
  //     });
  //     if (!res.ok) throw new Error('Error fetching usage data');
  //     const data = await res.json();
  //     console.log("Fetched graph data:", data);
  //     return data;
  //   } catch (error) {
  //     console.error('Error fetching usage data:', error);
  //     return [];
  //   }
  // };

  // const { annualEnergyData, setAnnualEnergyData } = useContext(NavbarContext);
  const [showElectric, setShowElectric] = useState(true);
  const [showGas, setShowGas] = useState(true);

  // useEffect(() => {
  //   const fetchAndSetData = async () => {
  //     const data = await fetchData(annualEnergyData.city_id);
  //     setAnnualEnergyData(data);
  //   };
  //   fetchAndSetData();
  // }, []);

  return (
    <div className={styles.greyContainer}>
       {/* <h>Annual Energy Consumption</h> */}
        {/* <ToddleEleGas/> */}
          <div style={{display:"flex", flexWrap:"wrap", flexDirection:"row"}}>
        <div style={{width:"100%"}}>
        <EleGasButtons 
        showElectric={showElectric} 
        setShowElectric={setShowElectric} 
        showGas={showGas} 
        setShowGas={setShowGas} 
      />
          </div>
          <div style={{width:"50%"}}>
          <AnnualEnergyData showElectric={showElectric} showGas={showGas} />
          </div>
        <div style={{ width:"50%", height:"100%"}}>
        <EnergyUsagePercent showElectric={showElectric} showGas={showGas} />
        <GasElectricKey/>
        </div>
        <div>
          <DownloadButtons/>
        </div>
        </div>
      </div>
  );
}

