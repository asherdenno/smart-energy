'use client';
import Navbar from "./components/navbar";
import styles from "@/app/page.module.css";
import { CityProvider } from "./context/CityContext";
import { useEffect } from "react";


const Overview = () => {

  return (
    <CityProvider>
      <main className={styles.content}>
        <Navbar title={"Hi, User!"} hasNotify={true} />
        <div className={styles.greyContainer}>
          <p>is the Overview page...</p>
        </div>
      </main>
    </CityProvider>
  );
}
export default Overview;