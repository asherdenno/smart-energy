'use client';
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";
import { CityProvider } from "../context/CityContext";

const Gas = () => {
  return (
    <CityProvider>
      <main className={styles.content}>
        <Navbar title={"Gas"} hasNotify={true} />
        <div className={styles.greyContainer}>
          <p>This is the Gas page.</p>
        </div>
      </main>
    </CityProvider>
  );
}
export default Gas;