'use client';
import styles from "@/app/page.module.css";
import Navbar from "../components/navbar";

const Reports = () => {
  return (
    <div>
      <nav>
        <Navbar title={"Reports"} hasNotify={true} />
      </nav>
      <br />
      <p>This is the Reports page.</p>
    </div>
  );
}
export default Reports;