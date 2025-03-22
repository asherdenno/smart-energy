'use client';
import styles from "@/app/page.module.css";
import Navbar from "../components/navbar";

const Reports = () => {
  return (
    <main className={styles.content}>
      <nav>
        <Navbar title={"Reports"} hasNotify={true} />
      </nav>
      <p>This is the Reports page.</p>
    </main>
  );
}
export default Reports;