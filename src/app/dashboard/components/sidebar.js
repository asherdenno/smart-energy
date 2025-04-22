'use client';
import { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useRouter, usePathname } from 'next/navigation';
import "./sidebar.css";


const sidebarOptions = [
  {
    text: "Overview",
    to: "../dashboard"
  },
  {
    text: "Graphs",
    to: "../dashboard/graphs"
  },
  {
    text: "Map",
    to: "../dashboard/map"
  },
  {
    text: "Admin",
    to: "../dashboard/admin"
  },
]

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [navIndex, setNavIndex] = useState(-1);

  useEffect(() => {
    console.log("Current pathname:", pathname);
    try {
      if (pathname === "/dashboard") setNavIndex(0);
      if (pathname === "/dashboard/graphs") setNavIndex(1);
      if (pathname === "/dashboard/map") setNavIndex(2);
      if (pathname === "/dashboard/admin") setNavIndex(3);
      if (pathname === "/dashboard/account") setNavIndex(4);
    } catch (error) {
      console.error(error);
    }
  }, [pathname]);


  const handleClick = (clickedIndex, destination) => {
    try {
      setNavIndex(clickedIndex);
      router.push(destination);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Drawer
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: "#A7A7A7",
          width: "250px",
          position: "fixed",
          height: "100vh"
        }
      }}
      variant="permanent"
    >
      <List style={{
        display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", position: "relative", gap: "15px"
      }}>
        {sidebarOptions.map((item, index) => {
          const { text } = item;
          return (
            <ListItem key={text} >
              <ListItemButton onClick={() => handleClick(index, item.to)} className={navIndex === index ? "active-button" : ""} sx={{
                backgroundColor: "white",
                borderRadius: "20px",
                border: "1px solid #000000",
              }}>
                <ListItemText primary={text} className={navIndex === index ? "active-text" : ""} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <List style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "auto", backgroundColor: "#A7A7A7" }}>
        <ListItem key={"Account"}>
          <ListItemButton onClick={() => handleClick(5, "../dashboard/account")} sx={{
            backgroundColor: "white",
            borderRadius: "20px",
            border: "1px solid #000000",
          }} className={navIndex === 4 ? "active-button" : ""}>
            <ListItemText primary={"Account"} className={navIndex === 4 ? "active-text" : ""} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer >
  );
}
export default Sidebar;