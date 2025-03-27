'use client';
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";

const Electricity = () => {
  return (
    <main className={styles.content}>
      <Navbar title={"Electricity"} hasNotify={true} />
      <div className={styles.greyContainer}>
        This is the Electricity page.
      </div>
    </main>
  );
}
export default Electricity;