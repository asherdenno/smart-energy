'use client';
import styles from "@/app/page.module.css";
import "./globals.css";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Landing = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/dashboard");
  };
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
        <Button onClick={handleClick} variant="contained">Sign up today</Button>
      </Box>
    </main>
  );
}
export default Landing;