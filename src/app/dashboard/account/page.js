'use client';
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";
import Link from "next/link";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react"

const Account = () => {
  return (
    <main className={styles.content}>
      <Navbar title={"Account"} hasCitySelect={false} />
      <div className={styles.greyContainer}>
        <p>is the Account page...</p>
          <Button variant="outlined" color="primary" onClick={() => signOut({ callbackUrl: "/" })}>Log out</Button>
      </div>
    </main>
  );
}
export default Account;