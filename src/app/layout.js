import { Geist, Geist_Mono } from "next/font/google";
import styles from "./page.module.css";
import Sidebar from "./dashboard/components/sidebar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Overview",
  description: "Overview page",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
          <div className={styles.container}>
            <main className={styles.content}>
              {children}
            </main>
          </div>
      </body>
    </html>
  )
}