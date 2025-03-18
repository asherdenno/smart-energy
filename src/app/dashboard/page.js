import styles from "@/app/page.module.css";
import Navbar from "./components/navbar";

const Overview = () => {
  return (
    <div>
      <Navbar title={"Overview"} hasNotify={true}/>
      <br />
      <p>is the Overview page...</p>
    </div>
  );
}
export default Overview;