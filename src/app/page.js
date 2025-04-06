"use client"
import * as React from 'react';
// import { useState } from 'react'
import styles from "@/app/page.module.css";
import "./globals.css";
import { FormControl, TextField, Button, Typography, Container, Box, Paper, Stack } from "@mui/material";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { FormControl, TextField, Button, Typography, Container, Box, Paper, Stack } from "@mui/material";
import Grid from '@mui/material/Grid2'
import Link from "next/link";

const Landing = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/dashboard");
  };
  return (
    


    <main className={styles.content}>
      <Container maxWidth="xs">
        <Paper elevation={10} sx={{ marginTop: 10, marginBottom: 10, p: 1, justifySelf: "center" }}>

          <Button
            onClick={() => signIn()}
          >Log in</Button>

        </Paper>
      </Container>

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