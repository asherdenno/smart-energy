import styles from "@/app/page.module.css";
import Navbar from "../components/navbar";

const Electricity = () => {
  return (
    <div>
      <Navbar title={"Electricity"} hasNotify={true}/>
      <br />
      This is the Electricity page.
    </div>
  );
}
export default Electricity;