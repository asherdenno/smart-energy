"use client";
import Link from "next/link";
import styles from "@/app/page.module.css";
import Navbar from "../components/navbar";

const InvalidAccess = () => {
    return (
        <main className={styles.content}>
            <Navbar title={"Unauthorized Access"} hasNotify={false} hasNetworkSelect={false} hasCitySelect={false}/>
            <div className={styles.greyContainer}>
                <div>
                    <p>You must be an Admin to access this page. Click <Link href="/dashboard">here</Link> to be redirected to the Overview page.</p>
                </div>
            </div>
        </main>
    )
}

export default InvalidAccess;