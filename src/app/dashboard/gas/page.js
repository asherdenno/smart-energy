import styles from "@/app/page.module.css";
import Navbar from "../components/navbar";

const Gas = () => {
  return (
    <div>
      <Navbar title={"Gas"} hasNotify={true}/>
      <br />
      <p>This is the Gas page.</p>
    </div>
  );
}
export default Gas;