'use client';
import styles from "@/app/page.module.css";
import Navbar from "../components/navbar";
import { CityProvider } from "../context/CityContext";

const Reports = () => {
  return (
    <CityProvider>
      <main className={styles.content}>
        <Navbar title={"Reports"} hasNotify={true} />
        <div className={styles.greyContainer}>
          <p>This is the Reports page.</p>
        </div>
      </main>
    </CityProvider>
  );
}
export default Reports;