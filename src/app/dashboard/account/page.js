'use client';
import Navbar from "../components/navbar";
import Link from "next/link";
import { Button } from "@mui/material";

const Account = () => {
  return (
    <div>
      <Navbar title={"Account"} hasCitySelect={false} />
      <br />
      <p>is the Account page...</p>
      <Link href="../">
        <Button variant="outlined" color="primary">Log out</Button>
      </Link>
    </div>
  );
}
export default Account;