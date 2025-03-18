import { Button } from "@mui/material";
import "@/app/globals.css";
import "./navbar.css";

const Navbar = ({title = "Add title", hasNotify = false} ) => {
  return (
    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <h1>{title}</h1>
        {hasNotify ? <Button variant="contained" color="primary">Notify</Button> : ""}
    </div>
  );
}
export default Navbar;