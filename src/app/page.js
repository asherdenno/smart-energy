"use client"
import * as React from 'react';
// import { useState } from 'react'
import "./page.module.css";
import "./globals.css";
import { FormControl, TextField, Button, Typography, Container, Box, Paper, Stack } from "@mui/material";
import Grid from '@mui/material/Grid2'
import Link from "next/link";

const Login = () => {

  const fetchUserData = async (userName, password) => {
    console.log(JSON.stringify({ userName, password }))
    try {
      setLoading(true);
      const res = await fetch('/api/fetch-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify({ userName })
      body: JSON.stringify({ userName, password })
      });

      const data = await res.json();
      console.log(data)
      setResults(data);
      setLoading(false);
    }
    catch (error) {
      console.error('Error fetching username:', error);
      return [];
    }
    
  };

  const [loading, setLoading] = React.useState(true);
  const [results, setResults] = React.useState([]);
  const [newUserName, setNewUserName] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")



  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 10, marginBottom: 10, p: 1, justifySelf: "center" }}>
        <FormControl sx={{ p: 2, bgcolor: "white", margin: 2 }}>
          <Typography sx={{ p: 2, textAlign: "center" }} variant="h3" color="primary.main">Log in</Typography>
          <Box sx={{ justifySelf: "center" }}>
            <Stack spacing={2}>
              <TextField id="login-page-username-textfield" label="Username" onChange={(e) => setNewUserName(e.target.value)} />
              <TextField id="login-page-password-textfield" label="Password" onChange={(e) => setNewPassword(e.target.value)} />
             
              <Button 
                onClick={() => fetchUserData(newUserName, newPassword)}
                >Log in</Button>
              
            </Stack>
          </Box>
        </FormControl>
      </Paper>
    </Container>
  );
}
export default Login;