'use client';
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";
import Link from "next/link";
import { Button } from "@mui/material";
import { signOut, useSession, getToken } from "next-auth/react"
import { NavbarContext } from "../context/NavbarContext";
import { useContext, useEffect } from "react";

const Account = () => {
  const { account, setAccount } = useContext(NavbarContext)
  const { data: session } = useSession();
    console.log("Account session: ", session);
    useEffect(() => {
      const accountData = {
        account_id : 1,
        email : "carlosrodriguez1@gmail.com",
        f_name : "Carlos",
        l_name : "Rodriguez",
        username : "CarlosRodriguez1",
        password : "•••••••••",
        account_type_id : 2,
        network_filter_id : 2,
        city_filter_id : null
      }
      setAccount(accountData);
    }, [setAccount])

  return (
    <main className={styles.content}>
      <Navbar title={"Account"} hasCitySelect={false} hasNetworkSelect={false}/>
      <div className={styles.greyContainer}>
        
        <h1>Account Information</h1>
        <p>Account type: Admin</p>
        <p>Account ID: {account?.account_id}</p>
        <p>Email: {account?.email}</p>
        <p>First Name: {account?.f_name}</p>
        <p>Last Name: {account?.l_name}</p>
        <p>Username: {account?.username}</p>
        <p>Password: {account?.password}</p>
        <p>Account Type ID: {account?.account_type_id}</p>
        <p>Network Filter ID: {account?.network_filter_id}</p>
          <Button variant="outlined" color="primary" onClick={() => signOut({ callbackUrl: "/" })}>Log out</Button>
      </div>
    </main>
  );
}
export default Account;