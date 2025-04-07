'use client';
import styles from "@/app/page.module.css";
import Navbar from "../components/navbar";
import DownloadButtons from "../components/pageComponents/downloadButton";
import { useContext } from "react";
import { useEffect } from "react";

const Reports = () => {
  // const { account, setAccount } = useContext(CityProvider);
  

  return (
      <main className={styles.content}>
        <Navbar title={"Reports"} hasNotify={true} hasCitySelect={false} hasNetworkSelect={false}/>
        <div className={styles.greyContainer}>
          <p>This is the Reports page.</p>
          <DownloadButtons/>
        </div>
      </main>
  );
}
export default Reports;