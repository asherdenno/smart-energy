'use client';
import Navbar from "../components/navbar";

const Electricity = () => {
  return (
    <div>
      <nav>
        <Navbar title={"Electricity"} hasNotify={true} />
      </nav>
      <br />
      This is the Electricity page.
    </div>
  );
}
export default Electricity;