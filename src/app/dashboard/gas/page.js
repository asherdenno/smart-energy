'use client';
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";

const Gas = () => {
  return (
    <main className={styles.content}>
      <Navbar title={"Gas"} hasNotify={true} />
      <div className={styles.greyContainer}>
        <p>This is the Gas page.</p>
      </div>
    </main>
  );
}
export default Gas;