"use client"
import { useState } from "react";
import EleGasButtons from "./eleGasButtons";
import AnnualEnergyData from "./annualEnergyData";
import EnergyUsagePercent from "./energyUsagePercent";

export default function ToddleEleGas() {
  const [showElectric, setShowElectric] = useState(true);
  const [showGas, setShowGas] = useState(true);

  return (
    <div>
      <EleGasButtons 
        showElectric={showElectric} 
        setShowElectric={setShowElectric} 
        showGas={showGas} 
        setShowGas={setShowGas} 
      />

      <AnnualEnergyData showElectric={showElectric} showGas={showGas} />

      <EnergyUsagePercent showElectric={showElectric} showGas={showGas} />
    </div>
  );
}
