import Navbar from "./components/navbar";

const Overview = () => {
  return (
    <div>
      <Navbar title={"Hi, User!"} hasNotify={true}/>
      <br />
      <p>is the Overview page...</p>
    </div>
  );
}
export default Overview;