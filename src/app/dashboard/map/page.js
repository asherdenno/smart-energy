'use client';
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";

const Map = () => {
  return (
    <main className={styles.content}>
      <nav>
        <Navbar title={"Map"} hasNotify={true} hasCitySelect={false}/>
      </nav>
      <p>This is the map page.</p>
    </main>
  );
}
export default Map;