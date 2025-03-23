'use client';
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";

const Electricity = () => {
  return (
    <main className={styles.content}>
      <nav>
        <Navbar title={"Electricity"} hasNotify={true} />
      </nav>
      This is the Electricity page.
    </main>
  );
}
export default Electricity;