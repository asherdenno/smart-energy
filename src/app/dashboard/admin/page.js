'use client';
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";
import { Button } from "@mui/material";

const Admin = () => {
  return (
    <main className={styles.content}>
      <nav>
        <Navbar title={"UserMangment"} hasCitySelect={false} />
      </nav>
      <div className={styles.greyContainer}>
        <div className={styles.space_between_flex_row} style={{ borderBottom: "1px solid black", padding: "10px 0" }}>
          <h2>Mange users </h2>
          <Button variant="outlined" color="primary" size="meduim" disableRipple
            sx={{
              color: 'black',
              backgroundColor: "white",
              border: "black 1px solid",
              borderRadius: "10px",
              padding: "2px 30px",
              textTransform: 'none',
            }}>Create new user</Button>
        </div>
        <p>Content</p>
      </div>
    </main>
  );
}
export default Admin;