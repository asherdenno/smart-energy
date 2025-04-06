'use client';
import Navbar from "./components/navbar";
import styles from "@/app/page.module.css";
import { useSession } from "next-auth/react"

const Overview = () => {
  // const { data: session } = useSession()
  // console.log(session)
  return (
    <main className={styles.content}>
      <Navbar title={"Hi, User!"} hasNotify={true} />
      <div className={styles.greyContainer}>
        {/* <p>Session username: {session.user.name}</p> */}
        <p>is the Overview page...</p>
      </div>
    </main>
  );
}
export default Overview;