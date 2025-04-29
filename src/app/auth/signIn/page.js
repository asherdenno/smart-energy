"use client";

import React, { useState, useEffect } from "react";
import { FormControl, TextField, Button, Typography, Container, Box, Paper, Stack } from "@mui/material";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const session = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (session?.status === "authenticated"){
      router.push("/dashboard");
    }
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (result?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Container sx={{backgroundImage: "url('/wind-turbines-background.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100%", padding: 0}}>
      <Paper elevation={10} sx={{ marginTop: 10, marginBottom: 10, p: 1, justifySelf: "center" }}>
        <FormControl sx={{ p: 2, bgcolor: "white", margin: 2 }}>
          <Typography sx={{ p: 2, textAlign: "center" }} variant="h3" color="primary.main">Log in</Typography>
          <Box sx={{ justifySelf: "center" }}>
            <Stack spacing={2}>
              <TextField id="login-page-username-textfield" 
              label="Username"
              value={data.username} 
              onChange={(e) => {
                setData({ ...data, username: e.target.value});
                }} />
              <TextField id="login-page-password-textfield" 
              label="Password" 
              type={"password"}
              value={data.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value});
                }}
                />
              <Button
                onClick={onSubmit}
              >Log in</Button>
            </Stack>
          </Box>
          {error && <Typography sx={{ color: "red", textAlign: "center" }}>{error}</Typography>}
        </FormControl>
      </Paper>
    </Container>
  )
}

export default LoginPage;