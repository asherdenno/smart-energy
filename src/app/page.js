import styles from "./page.module.css";
import { FormLabel, FormControl, TextField, Button, Typography, Container, Box } from "@mui/material";
import Link from "next/link";

const Login = () => {
  return (
    <Container sx={{'& .MuiContainer-root':{
      display: "flex",
      justifyContent: "center",
      flexDirection: "row"
    }}}>
      <Box sx={{ alignContent: "center" }}>
        <FormControl sx={{ p: 2, bgcolor: "black" }}>
          <Typography sx={{ p: 2, alignSelf: "center" }} variant="h3" color="primary.main">Log in</Typography>
          <TextField id="login-page-username-textfield" label="Username" />
          <TextField id="login-page-password-textfield" label="Password" type="password" />
          <Link href="../dashboard/">
            <Button sx={{ justifySelf: "center" }} variant="outlined">Log in</Button>
          </Link>
          <FormLabel id="login-page-resetpassword-formlabel" color="primary" label="Need to reset your password?" />
          <Button variant="text">Click here</Button>
          <FormLabel id="login-page-createaccount-formlabel" color="primary" label="Don't have an account?" />
          <Button variant="text">Create an account here</Button>
        </FormControl>
      </Box>
    </Container>
  );
}
export default Login;