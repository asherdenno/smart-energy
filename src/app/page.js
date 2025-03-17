'use client';
import styles from "./page.module.css";
import { useEffect, useState } from 'react';
import { Button } from "@mui/material";
import Link from "next/link";

const Login = () => {
  return (
    <div>
      This is the login page.
      <Link href="/dashboard">
        <Button variant="contained" color="primary">Login</Button>
      </Link>
    </div>
  );
}
export default Login;