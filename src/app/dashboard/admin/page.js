'use client';
import Navbar from "../components/navbar";
import  "@/app/page.module.css";

const Admin = () => {
  return (
    <div>
      <nav>
        <Navbar title={"UserMangment"} hasCitySelect={false} />
      </nav>
      <br />
      <div className="container">
        <h2>Mange users </h2>
        <p>Content</p>
      </div>
    </div>
  );
}
export default Admin;