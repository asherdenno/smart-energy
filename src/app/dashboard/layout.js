'use client';
import styles from "@/app/page.module.css";
import Sidebar from "./components/sidebar"
import { CityProvider } from "./context/NavbarContext";

export default function DashboardLayout({ children }) {
  return (
      <div className={styles.container}>
        <aside className={"sidebar"}>
          <Sidebar />
        </aside>
        <CityProvider>
          {children}
        </CityProvider>
      </div>
  );
}