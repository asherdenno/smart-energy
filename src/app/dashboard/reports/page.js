'use client';
import styles from "@/app/page.module.css";
import Navbar from "../components/navbar";
import DownloadButtons from "../components/pageComponents/downloadButton";
import { useContext } from "react";
import { useEffect } from "react";
import { NavbarContext } from "../context/NavbarContext";

const Reports = () => {
  // const { account, setAccount } = useContext(CityProvider);
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
        <Navbar title={"Reports"} hasNotify={true} />
        <div className={styles.greyContainer}>
          <p>This is the Reports page.</p>
          <DownloadButtons/>
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
        </div>
      </main>
  );
}
export default Reports;