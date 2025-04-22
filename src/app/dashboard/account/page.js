'use client';
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";
import Link from "next/link";
import { Button } from "@mui/material";
import { signOut, useSession, getToken } from "next-auth/react"
import { NavbarContext } from "../context/NavbarContext";
import { useContext, useEffect } from "react";

const Account = () => {
  const { account, setAccount, resetDetails } = useContext(NavbarContext)
  const { data: session } = useSession();
    console.log("Account session: ", session);

    
    const setAccountAdmin = async () => {
      const accountData = {
        account_id : 1,
        email : "fredrodriguez1@gmail.com",
        f_name : "Fred",
        l_name : "Rodriguez",
        username : "FredRodriguez1",
        password : "•••••••••",
        account_type_id : 1,
        network_filter_id : 5,
        city_filter_id : 16
      }
      setAccount(accountData);
    };
      
      const setAccountCity = async () => {
        const accountData = {
            account_id : 5,
            email : "carlosrodriguez1@gmail.com",
            f_name : "Carlos",
            l_name : "Rodriguez",
            username : "CarlosRodriguez1",
            password : "•••••••••",
            account_type_id : 2,
            network_filter_id : 5,
            city_filter_id : 16
        }
        setAccount(accountData);
      };

      const setAccountNetwork = async () => {
        const accountData = {
          account_id : 5,
          email : "bob.smith@gmail.com",
          f_name : "Bob",
          l_name : "Smith",
          username : "BobSmith3",
          password : "•••••••••",
          account_type_id : 3,
          network_filter_id : 5,
          city_filter_id : 16
      }
        setAccount(accountData);
      };
      
      const handleLogout = () => {
        resetDetails();
        signOut({ callbackUrl: "/" });
    }
  return (
    <main className={styles.content}>
      <Navbar title={"Account"} hasCitySelect={false} hasNetworkSelect={false}/>
      <div className={styles.greyContainer}>
        
        {/* <h1>Account Information</h1>
        <p>Account type: Admin</p>
        <p>Account ID: {account.account_id}</p>
        <p>Email: {account.email}</p>
        <p>First Name: {account.f_name}</p>
        <p>Last Name: {account.l_name}</p>
        <p>Username: {account.username}</p>
        <p>Password: {account.password}</p>
        <p>Account Type ID: {account.account_type_id}</p>
        <p>Network Filter ID: {account.network_filter_id}</p> */}
        <Button variant="outlined" color="primary" onClick={setAccountAdmin}>Make admin</Button>
        <Button variant="outlined" color="primary" onClick={setAccountCity}>Make city manager</Button>
        <Button variant="outlined" color="primary" onClick={setAccountNetwork}>Make network manager</Button>
        <Button variant="contained" color="primary" onClick={handleLogout}>Log out</Button>
      </div>
    </main>
  );
}
export default Account;