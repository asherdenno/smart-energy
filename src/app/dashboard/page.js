'use client';
import Navbar from "./components/navbar";
import styles from "@/app/page.module.css";
import { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { useSession } from "next-auth/react"

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

  const { data: session, status } = useSession();
  console.log(session)

  if (status === "authenticated") {
    console.log("success!")
  }

  return (
      <main className={styles.content}>
        <Navbar title={"Hi, Carlos!"} hasNotify={true} hasCitySelect={false} hasNetworkSelect={false}/>
        <div className={styles.greyContainer}>
          <Typography variant="h6">Eco tip: {randomTip}</Typography>
          <Typography>This page is not complete as we don't have the data to construct it.</Typography>
          <Typography>Other pages:</Typography>
          <Button variant="outlined" color="primary" href="/dashboard/graphs">Detailed graphs</Button>
          <Button variant="outlined" color="primary" href="/dashboard/map">Interactive Map</Button>
        </div>
      </main>

  );
}
export default Overview;