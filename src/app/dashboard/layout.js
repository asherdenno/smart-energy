import styles from "@/app/page.module.css";
import Sidebar from "./components/sidebar";
import { Button } from "@mui/material";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.container}>
      <aside className={"sidebar"}>
        <Sidebar />
      </aside>
      <main className={styles.content}>
        {children}
        <Link href="./">
          <Button variant="outlined" color="primary">Log out</Button>
        </Link>
      </main>
    </div>
  );
}