'use client';
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";
import Link from "next/link";
import { Button } from "@mui/material";
import { NavbarContext } from "../context/NavbarContext";
import { useContext, useEffect } from "react";

const Account = () => {
  const { account, setAccount } = useContext(NavbarContext)
    useEffect(() => {
      const accountData = {
        account_id : 1,
        email : "example@gmail.com",
        f_name : "John",
        l_name : "Smith",
        username : "jsmith",
        password : "Password1",
        account_type_id : 2,
        network_filter_id : 2,
        city_filter_id : null
      }
      setAccount(accountData);
    }, [])

  return (
    <main className={styles.content}>
      <Navbar title={"Account"} hasCitySelect={false} />
      <div className={styles.greyContainer}>
        
        <h1>Account Information</h1>
        <p>Account ID: {account.account_id}</p>
        <p>Email: {account.email}</p>
        <p>First Name: {account.f_name}</p>
        <p>Last Name: {account.l_name}</p>
        <p>Username: {account.username}</p>
        <p>Password: {account.password}</p>
        <p>Account Type ID: {account.account_type_id}</p>
        <p>Network Filter ID: {account.network_filter_id}</p>
        <p>City Filter ID: {account.city_filter_id}</p>
        <Link href="../">
          <Button variant="outlined" color="primary">Log out</Button>
        </Link>
      </div>
    </main>
  );
}
export default Account;