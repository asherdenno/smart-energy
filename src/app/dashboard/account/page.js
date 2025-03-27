'use client';
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";
import Link from "next/link";
import { Button } from "@mui/material";

const Account = () => {
  return (
    <main className={styles.content}>
      <Navbar title={"Account"} hasCitySelect={false} />
      <div className={styles.greyContainer}>
        <p>is the Account page...</p>
        <Link href="../">
          <Button variant="outlined" color="primary">Log out</Button>
        </Link>
      </div>
    </main>
  );
}
export default Account;