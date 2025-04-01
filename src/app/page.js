import "./page.module.css";
import "./globals.css";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

const Landing = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/dashboard");
  };
  return (
    <Box>
      <Typography variant="h1">Welcome to the Dashboard</Typography>
      <Typography>This is the landing page.</Typography>
      <Button onClick={handleClick}>Go to dashboard</Button>
    </Box>
  );
}
export default Landing;