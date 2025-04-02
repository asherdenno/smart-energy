"use client"
import * as React from 'react';
// import { useState } from 'react'
import "./page.module.css";
import "./globals.css";
import { FormControl, TextField, Button, Typography, Container, Box, Paper, Stack } from "@mui/material";
import { signIn } from 'next-auth/react';
import Grid from '@mui/material/Grid2'
import Link from "next/link";

const Login = () => {
  return (
  <Container maxWidth="xs">
    <Paper elevation={10} sx={{ marginTop: 10, marginBottom: 10, p: 1, justifySelf: "center" }}>

      <Button
        onClick={() => signIn()}
      >Log in</Button>

    </Paper>
  </Container>
  )
}
export default Login;