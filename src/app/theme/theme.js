'use client';
import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      primary: {
        main: '#fefefe',
      },
    },
    typography: {
      h3: {
        fontSize: "3rem",
        fontWeight: 600,
      },
      body1: {
        fontSize: "1.5rem",
        fontWeight: 300,
      }
    }
  });
  export default theme;