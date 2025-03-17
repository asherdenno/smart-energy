import styles from "@/app/page.module.css";
import Sidebar from "./components/sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
              <Sidebar />
            </aside>
            <main className={styles.content}>
              {children}
            </main>
          </div>
    );
}