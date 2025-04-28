'use client';
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";
import dynamic from 'next/dynamic';
import React from 'react';
import { Box, Typography } from "@mui/material";
import ReferenceBar from "./components/ReferenceBar";
import { useSession } from "next-auth/react";

// Dynamically import the Leaflet map component
const LeafletMap = dynamic(() => import('../components/LeafletMap'), { ssr: false });

const Map = () => {
  const { data: session } = useSession();
  const account = session?.user;
  if (!account) {
    return (
      <main className={styles.content}>
        <nav>
          <Navbar title={"Map"} hasNotify={true} hasCitySelect={false} hasNetworkSelect={false}/>
        </nav>
        <Typography variant="h5" sx={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center"}}>Validating credentials...</Typography>
      </main>
    );
  }
  if (account.account_type_id === 3) {
    return (
      <main className={styles.content}>
        <nav>
          <Navbar title={"Map"} hasNotify={true} hasCitySelect={false} hasNetworkSelect={false}/>
        </nav>
        <Box sx={{display: 'flex', alignItems: "start", justifyContent: "center", height: '100vh', width: '100%'}}>
          <Typography variant="h6" sx={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center"}}>Map view is unavailable for network managers.</Typography>
        </Box>
      </main>
    );
  }
  return (
        <main className={styles.content}>
            <nav>
                <Navbar title={"Map"} hasNotify={true} hasCitySelect={true} hasNetworkSelect={false}/>
            </nav>
            <Typography variant="h5" sx={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center"}}>Total Annual Consumption Of Electricity</Typography>
            <Box sx={{display: 'flex', alignItems: "start", justifyContent: "center", height: '100vh', width: '100%'}}>
              <LeafletMap />
              <ReferenceBar sx={{marginLeft: "10px"}} />
            </Box>
        </main>
  );
};

export default Map;