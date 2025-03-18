'use client';
import { useState } from 'react';
import { Button, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import "@/app/globals.css";
import Link from "next/link";
import "./sidebar.css";


const sidebarOptions = [
  {
    text: "Overview",
    to: "../dashboard"
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
  const [navIndex, setNavIndex] = useState(0);

  const handleClick = (clickedIndex) => {
    setNavIndex(clickedIndex);
  }

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
        {sidebarOptions.map((item, index) => {
          const { text } = item;
          return (
            <ListItem component={Link} href={item.to} key={text} >
              <ListItemButton onClick={() => handleClick(index)} sx={{
                backgroundColor: "white",
                borderRadius: "37px",
                border: "2px solid black",
              }} className={navIndex === index ? "active" : ""}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <List style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "auto", backgroundColor: "#A5A5A5" }}>
        <ListItem component={Link} href={"../dashboard/account"} key={"Account"}>
          <ListItemButton onClick={() => handleClick(4)} sx={{
            backgroundColor: "white",
            borderRadius: "37px",
            border: "2px solid black"
          }} className={navIndex === 4 ? "active" : ""}>
            <ListItemText primary={"Account"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer >
  );
}
export default Sidebar;