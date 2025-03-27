"use client"
import { useState } from "react";
import EleGasButtons from "./eleGasButtons";
import AnnualEnergyData from "./annualEnergyData";
import EnergyUsagePercent from "./energyUsagePercent";

export default function AnnualEnergyOverview() {
  const [showElectric, setShowElectric] = useState(true);
  const [showGas, setShowGas] = useState(true);

  return (
<div>
       <h>Annual Energy Consumption</h>
        {/* <ToddleEleGas/> */}
        <div style={{border:"#000 1px solid"/*, width:"30%", height:"30%"*/}}>
          <div style={{display:"flex"}}>
          <div style={{width:"50%"}}>
          <AnnualEnergyData showElectric={showElectric} showGas={showGas} />
          </div>
        <div style={{ width:"50%", height:"100%"}}>
        <EnergyUsagePercent showElectric={showElectric} showGas={showGas} />
        </div>
        <div>
        <EleGasButtons 
        showElectric={showElectric} 
        setShowElectric={setShowElectric} 
        showGas={showGas} 
        setShowGas={setShowGas} 
      />
        </div>
          </div>
      </div>
      </div>
  );
}

