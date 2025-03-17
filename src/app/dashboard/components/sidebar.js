import { Button, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import "@/app/globals.css";
import Link from "next/link";
import "./sidebar.css"; 

const drawerWidth = 300;

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
    <div>
      {/* Sidebar - Permanent on the left */}
      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: "#B7B7B7",
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <List style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", width:"335px" }}>
          {sidebarOptions.map((item) => {
            const { text } = item;
            return (
              <ListItem component={Link} href={item.to} key={text}>
                <ListItemButton sx={{
                  backgroundColor: "white",
                  borderRadius: "37px",
                  border: "2px solid black",
                  width: "100%",
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
    </div >
  );
}
export default Sidebar;