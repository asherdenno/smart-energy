import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import "../globals.css";
import Link from "next/link";

const drawerWidth = 300;

const sidebarOptions = [
    {
        text: "Overview",
        to: "/"
    },
    {
        text: "Electricity",
        to: "/electricity"
    },
    {
        text: "Gas",
        to: "/gas"
    },
    {
        text: "Reports",
        to: "/reports"
    }
]

const Sidebar = () => {
  return (
      <div>
        {/* Sidebar - Permanent on the left */}
      <Drawer
        sx={{
          '& .MuiDrawer-paper':{
            width:drawerWidth
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {sidebarOptions.map((item) => {
            const {text} = item;
            return(
            <ListItem component={Link} href={item.to} key={text}>
            <ListItemButton>
              <ListItemText primary={text}/>
            </ListItemButton>
            </ListItem>
            );
        })}
        </List>
      </Drawer>
      </div>
  );
}
export default Sidebar;