'use client';
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";
import dynamic from 'next/dynamic';
import React from 'react';
import { Box } from "@mui/material";
import ReferenceBar from "./components/ReferenceBar";

// Dynamically import the Leaflet map component
const LeafletMap = dynamic(() => import('../components/LeafletMap'), { ssr: false });

const Map = () => {
  return (
        <main className={styles.content}>
            <nav>
                <Navbar title={"Map"} hasNotify={true} hasCitySelect={true} />
            </nav>
            <Box sx={{display: 'flex', alignItems: "start", justifyContent: "center", height: '100vh'}}>
              <LeafletMap />
              <ReferenceBar />
            </Box>
        </main>
  );
};

export default Map;