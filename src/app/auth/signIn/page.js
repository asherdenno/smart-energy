"use client";

import React, { useRef } from "react";
import { FormControl, TextField, Button, Typography, Container, Box, Paper, Stack } from "@mui/material";
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const userName = useRef("")
  const pass = useRef("")

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/dashboard"
    })
  }

  return (
    <Container sx={{backgroundImage: "url('/wind-turbines-background.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100%", padding: 0}}>
      <Paper elevation={10} sx={{ marginTop: 10, marginBottom: 10, p: 1, justifySelf: "center" }}>
        <FormControl sx={{ p: 2, bgcolor: "white", margin: 2 }}>
          <Typography sx={{ p: 2, textAlign: "center" }} variant="h3" color="primary.main">Log in</Typography>
          <Box sx={{ justifySelf: "center" }}>
            <Stack spacing={2}>
              <TextField id="login-page-username-textfield" 
              label="Username" 
              onChange={e => (userName.current = e.target.value)} />
              <TextField id="login-page-password-textfield" 
              label="Password" 
              type={"password"} 
              onChange={e => (pass.current = e.target.value)} />
              <Button
                onClick={onSubmit}
              >Log in</Button>
            </Stack>
          </Box>
        </FormControl>
      </Paper>
    </Container>
  )
}

export default LoginPage;