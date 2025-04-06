"use client"

import "./globals.css";
import styles from "@/app/page.module.css";
import { signIn } from 'next-auth/react';
import { Button, Typography, Box } from "@mui/material";

const Landing = () => {

  return (

    <main className={styles.content}>
      <Box
        className={styles.center_center_flex_column} 
        sx={{
          textAlign: "center",
          gap: "20px",
          padding: "20px",
          height: "100%",
          width: "100%"
        }}>
        <Typography variant="h2">Smart Energy Management</Typography>
        <Typography>
          Our cutting edge tool provides you with the necessary insights to
          make smart decisions about your energy.
        </Typography>
        <Typography>Click the button below to save today:</Typography>
        <Button onClick={() => signIn()} variant="contained">Log in</Button>
      </Box>
    </main>
  
  );
}
export default Landing;