import { FormLabel, FormControl, TextField, Button, Typography, Container, Box } from "@mui/material";

const Login = () => {
    return (
        <Box sx={{justifySelf:"center"}}>
            <FormControl sx={{ p: 2, bgcolor: "black" }}>
                <Typography sx={{p:2, alignSelf:"center"}}variant="h3" color="primary.main">Log in</Typography>
                <TextField id="login-page-username-textfield" label="Username" />
                <TextField id="login-page-password-textfield" label="Password" type="password" />
                <Button variant="outlined">Log in</Button>
                <FormLabel id="login-page-resetpassword-formlabel" color="primary" label="Need to reset your password?" />
                <Button variant="text">Click here</Button>
                <FormLabel id="login-page-createaccount-formlabel" color="primary" label="Don't have an account?" />
                <Button variant="text">Create an account here</Button>
            </FormControl>
        </Box>
    );
}
export default Login;