'use client';
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";
import dynamic from 'next/dynamic';
import React from 'react';
import { Box, Typography } from "@mui/material";
import ReferenceBar from "./components/ReferenceBar";

// Dynamically import the Leaflet map component
const LeafletMap = dynamic(() => import('../components/LeafletMap'), { ssr: false });

const Map = () => {
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