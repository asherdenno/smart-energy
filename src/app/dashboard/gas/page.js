'use client';
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";

const Gas = () => {
  return (
    <main className={styles.content}>
      <nav>
        <Navbar title={"Gas"} hasNotify={true} />
      </nav>
      <p>This is the Gas page.</p>
    </main>
  );
}
export default Gas;