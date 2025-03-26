'use client';
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";
import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the Leaflet map component
const LeafletMap = dynamic(() => import('../components/LeafletMap'), { ssr: false });

const Map = () => {
  return (
    <main className={styles.content}>
      <nav>
        <Navbar title={"Map"} hasNotify={true} hasCitySelect={false} />
      </nav>
      <LeafletMap />
      <p>This is the map page.</p>
    </main>
  );
};

export default Map;