<<<<<<< HEAD
import { Typography } from "@mui/material"
=======
'use client';
import styles from "./page.module.css";
import { useEffect, useState } from 'react';
import { Button } from "@mui/material";
import Link from "next/link";
>>>>>>> 5ddfbbbb3975138a6ab1620514063538be3af44a

const Login = () => {
  return (
<<<<<<< HEAD
      <Typography variant="body1">This is the Gas page.</Typography>
=======
    <div>
      This is the login page.
      <Link href="/dashboard">
        <Button variant="contained" color="primary">Log in</Button>
      </Link>
    </div>
>>>>>>> 5ddfbbbb3975138a6ab1620514063538be3af44a
  );
}
export default Login;