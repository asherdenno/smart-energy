import styles from "@/app/page.module.css";
import Navbar from "../components/Navbar";

const Reports = () => {
  return (
    <div>
      <Navbar title={"Reports"} hasNotify={true}/>
      <br />
      <p>This is the Reports page.</p>
    </div>
  );
}
export default Reports;