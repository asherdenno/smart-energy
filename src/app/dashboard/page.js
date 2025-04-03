'use client';
import Navbar from "./components/navbar";
import styles from "@/app/page.module.css";
import { useEffect } from "react";


const Overview = () => {

  return (
      <main className={styles.content}>
        <Navbar title={"Hi, User!"} hasNotify={true} />
        <div className={styles.greyContainer}>
          <p>is the Overview page...</p>
        </div>
      </main>
  );
}
export default Overview;