"use client"
import styles from "@/app/page.module.css";
import { useState } from "react";
import EleGasButtons from "../charts/overview/eleGasButtons";
import AnnualEnergyData from "../charts/overview/annualEnergyData";
import EnergyUsagePercent from "../charts/overview/energyUsagePercent";
import { ToggleButton } from "@mui/material";
import DownloadButtons from "./downloadButton";

export default function AnnualEnergyOverview() {
  const [showElectric, setShowElectric] = useState(true);
  const [showGas, setShowGas] = useState(true);
  // const 

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
        </div>
        <div>
          <DownloadButtons/>
        </div>
        </div>
      </div>
  );
}

