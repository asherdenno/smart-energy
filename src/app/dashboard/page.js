'use client';
import Navbar from "./components/navbar";
import styles from "@/app/page.module.css";

const Overview = () => {
  return (
    <main className={styles.content}>
      <nav>
        <Navbar title={"Hi, User!"} hasNotify={true} />
      </nav>
      <p>is the Overview page...</p>
    </main>
  );
}
export default Overview;