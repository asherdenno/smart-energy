'use client';
import Navbar from "./components/navbar";
import styles from "@/app/page.module.css";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";


const Overview = () => {

  const ecoTips = [
    "Use EPC A rated appliances when possible.",
    "Switch off lights when leaving a room.",
    "Switch to LED light bulbs.",
    "Use a programmable thermostat.",
    "Promote sustainable transport."
  ];

  const [randomTip, setRandomTip] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * ecoTips.length);
    setRandomTip(ecoTips[randomIndex]);
  })
  return (
      <main className={styles.content}>
        <Navbar title={"Hi, User!"} hasNotify={true}/>
        <Typography variant="body1">Eco tip: {randomTip}</Typography>
        <div className={styles.greyContainer}>
          <p>is the Overview page...</p>
        </div>
      </main>
  );
}
export default Overview;