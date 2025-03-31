'use client';

import Navbar from "../components/navbar";
import { CityProvider } from "../context/CityContext";
import EnergyUsagePercent from "../components/charts/overview/energyUsagePercent";
import AnnualEnergyData from "../components/charts/overview/annualEnergyData";
import EleGasButtons from "../components/charts/overview/eleGasButtons";
import ToddleEleGas from "../components/charts/specific/toddleEleGas";

import styles from "@/app/page.module.css";
import { BorderAll } from "@mui/icons-material";
import AnnualEnergyOverview from "../components/pageComponents/annualEnergyOverview";

export default function Graphs() {
  return (
    <CityProvider>
      <main className={styles.content}>
        <Navbar title={"Graphs"} hasNotify={true} />
        <div /*Overview */>
        <h1>Annual Energy Consumption Overview</h1>
        <AnnualEnergyOverview/>
        </div>
      </main>
    </CityProvider>
  );
}
