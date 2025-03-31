'use client';
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";
import { CityProvider } from "../context/CityContext";

const Electricity = () => {
  return (
    <CityProvider>
      <main className={styles.content}>
        <Navbar title={"Electricity"} hasNotify={true} />
        <div className={styles.greyContainer}>
          This is the Electricity page.
        </div>
      </main>
    </CityProvider>
  );
}
export default Electricity;