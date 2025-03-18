import { Button, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import "@/app/globals.css";
import Link from "next/link";
import "./sidebar.css";


const sidebarOptions = [
  {
    text: "Overview",
    to: "../dashboard/"
  },
  {
    text: "Electricity",
    to: "../dashboard/electricity"
  },
  {
    text: "Gas",
    to: "../dashboard/gas"
  },
  {
    text: "Reports",
    to: "../dashboard/reports"
  }
]

const Sidebar = () => {
  return (
    <Drawer
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: "#B7B7B7",
          width: "auto",
          position: "relative",
          height: "100%"
        }
      }}
      variant="permanent"
      style={{height: "100%"}}
    >
      <List style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", position: "relative", flex: "2" }}>
        {sidebarOptions.map((item) => {
          const { text } = item;
          return (
            <ListItem component={Link} href={item.to} key={text} >
              <ListItemButton sx={{
                backgroundColor: "white",
                borderRadius: "37px",
                border: "2px solid black",
              }}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <List style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "auto", backgroundColor: "#A5A5A5" }}>
        <ListItem component={Link} href={"./"} key={"Account"}>
          <ListItemButton sx={{
            backgroundColor: "white",
            borderRadius: "37px",
            border: "2px solid black"
          }}>
            <ListItemText primary={"Account"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer >
  );
}
export default Sidebar;