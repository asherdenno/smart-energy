import "./page.module.css";
import "./globals.css";
import { FormControl, TextField, Button, Typography, Container, Box, Paper, Stack } from "@mui/material";
import Grid from '@mui/material/Grid2'
import Link from "next/link";

const Login = () => {
  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 10, marginBottom: 10, p: 1, justifySelf: "center" }}>
        <FormControl sx={{ p: 2, bgcolor: "white", margin: 2 }}>
          <Typography sx={{ p: 2, textAlign: "center" }} variant="h3" color="primary.main">Log in</Typography>
          <Box sx={{ justifySelf: "center" }}>
            <Stack spacing={2}>
              <TextField id="login-page-username-textfield" label="Username" />
              <TextField id="login-page-password-textfield" label="Password" type="password" />
              <Grid container justifyContent="flex-end" spacing={1} sx={{ mt: 1 }} >
                <Grid size="grow">
                  <Link href='/reset-password'>Reset Password</Link>
                </Grid>
              </Grid>
              <Button href="../dashboard/" variant="contained">Log in</Button>
              <Grid container justifyContent="flex-end" spacing={1} sx={{ mt: 1 }} >
                <Grid size="grow">
                  <Link href='../dashboard/electricity'>Create Account</Link>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </FormControl>
      </Paper>
    </Container>
  );
}
export default Login;