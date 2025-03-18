import styles from "@/app/page.module.css";
import Navbar from "./components/navbar";

const Account = () => {
  return (
    <div>
      <Navbar title={"Account"} hasNotify={true}/>
      <br />
      <p>is the Account page...</p>
    </div>
  );
}
export default Account;