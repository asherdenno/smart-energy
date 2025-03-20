'use client';
import Navbar from "../components/navbar";

const Admin = () => {
  return (
    <div>
      <nav>
        <Navbar title={"Admin"} hasNotify={true} />
      </nav>
      <br />
      <p>This is the admin page.</p>
    </div>
  );
}
export default Admin;