'use client';
import Navbar from "./components/navbar";

const Overview = () => {
  return (
    <div>
      <nav>
        <Navbar title={"Hi, User!"} hasNotify={true} />
      </nav>
      <br />
      <p>is the Overview page...</p>
    </div>
  );
}
export default Overview;