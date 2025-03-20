import "../page.module.css";
import "../globals.css";
import { FormControl, TextField, Button, Typography, Container, Box, Paper, Stack } from "@mui/material";
import Grid from '@mui/material/Grid2'
import Link from "next/link";

const CreateAccount = () => {
    return (
        <Container maxWidth="xs">
            <Paper elevation={10} sx={{ marginTop: 10, marginBottom: 10, p: 1, justifySelf: "center" }}>
                <FormControl sx={{ p: 2, bgcolor: "white", margin: 2 }}>
                    <Grid container justifyContent="flex-end" spacing={1} sx={{ mt: 1 }} >
                        <Grid size="grow">
                            <Link href='/'>Back</Link>
                        </Grid>
                    </Grid>
                    <Typography sx={{ p: 2, textAlign: "center" }} variant="h3" color="primary.main">Create Account</Typography>
                    <Box sx={{ justifySelf: "center" }}>
                        <Stack spacing={2}>
                            <TextField id="create-account-username-textfield" label="Username" />
                            <TextField id="create-account-password-textfield" label="Password" type="password" />
                            <TextField id="create-account-confirm-password-textfield" label="Confirm Password" type="password" />
                            <Button href="../dashboard/" variant="contained">Create Account</Button>
                        </Stack>
                    </Box>
                </FormControl>
            </Paper>
        </Container>
    );
}
export default CreateAccount;