'use client';
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";

const Admin = () => {
  return (
    <main className={styles.content}>
      <nav>
        <Navbar title={"UserMangment"} hasCitySelect={false} />
      </nav>
      <div className={styles.greyContainer}>
        <h2>Mange users </h2>
        <p>Content</p>
      </div>
    </main>
  );
}
export default Admin;