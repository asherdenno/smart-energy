"use client";
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";
import Link from "next/link";
import { Button } from "@mui/material";
import { signOut, useSession, getToken } from "next-auth/react"
import { NavbarContext } from "../context/NavbarContext";
import { useContext, useEffect } from "react";

const Account = () => {
  // const { account, setAccount } = useContext(NavbarContext)
  const { data: session } = useSession();
    // console.log("Account session: ", session);
    // useEffect(() => {
    //   const accountData = {
    //     account_id : 1,
    //     email : "carlosrodriguez1@gmail.com",
    //     f_name : "Carlos",
    //     l_name : "Rodriguez",
    //     username : "CarlosRodriguez1",
    //     password : "•••••••••",
    //     account_type_id : 2,
    //     network_filter_id : 2,
    //     city_filter_id : null
    //   }
    //   setAccount(accountData);
    // }, [])


    let type_of_account;
    switch(session?.user.account_type_id){
      case 2:
        type_of_account = "City Council";
        break;
      case 3:
        type_of_account = "Network Manager";
        break;
      default:
        type_of_account = "Admin";
    }

    const city = session?.user.city ?? "N/A"
    const network = session?.user.network ?? "N/A"

    useEffect(() => {
      if (session) {
        console.log("Session: ", session);
      }
    }, [session]);
    
  return (
    <main className={styles.content}>
      <Navbar title={"Account"} hasCitySelect={false} hasNetworkSelect={false}/>
      <div className={styles.greyContainer}>
        
        <h1>Account Information</h1>
        <p>Account type: {type_of_account}</p>
        <p>Account ID: {session?.user.account_id}</p>
        <p>First Name: {session?.user.f_name}</p>
        <p>Last Name: {session?.user.l_name}</p>
        <p>Username: {session?.user.username}</p>
        <p>Email: {session?.user.email}</p>
        <p>City Filter ID: {session?.user.city_filter_id ?? "N/A"}</p>
        <p>Network Filter ID: {session?.user.network_filter_id ?? "N/A"}</p>
        <Button variant="outlined" color="primary" onClick={() => signOut({ callbackUrl: "/" })}>Log out</Button>
      </div>
    </main>
  );
}
export default Account;