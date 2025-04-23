import { Geist, Geist_Mono } from "next/font/google";
import styles from "./page.module.css";
import Providers from "./Providers";

export const metadata = {
  title: "Overview",
  description: "Overview page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <div className={styles.container}>{children}</div>
        </body>
      </Providers>
    </html>
  )
}
