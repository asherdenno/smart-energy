import { Geist, Geist_Mono } from "next/font/google";
import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import styles from "./page.module.css";
import Sidebar from "./components/sidebar";


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
      <body className={styles.page}>
        <Sidebar />
        <div >
          {children}
        </div>
      </body>
    </html>
  )
}