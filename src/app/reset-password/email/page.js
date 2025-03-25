import "../../page.module.css";
import "../../globals.css";
import { FormControl, TextField, Button, Typography, Container, Box, Paper, Stack } from "@mui/material";
import Grid from '@mui/material/Grid2'
import Link from "next/link";

const GetEmail = () => {
  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 10, marginBottom: 10, p: 1, justifySelf: "center" }}>
        <FormControl sx={{ p: 2, bgcolor: "white", margin: 2 }}>
            <Grid container justifyContent="flex-end" spacing={1} sx={{ mt: 1 }} >
                <Grid size="grow">
                  <Link href='/'>Back</Link>
                </Grid>
            </Grid>
          <Typography sx={{ p: 2, textAlign: "center" }} variant="h3" color="primary.main">Reset Password</Typography>
          <Box sx={{ justifySelf: "center" }}>
            <Stack spacing={2}>
              <TextField id="reset-password-email-textfield" label="Email Address"
              helperText="Please enter the email address that requires a password reset to continue"/>
              <Button href="/reset-password/password" variant="contained">Next</Button>
            </Stack>
          </Box>
        </FormControl>
      </Paper>
    </Container>
  );
}
export default GetEmail;