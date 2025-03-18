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
  const router = useRouter();
  const pathname = usePathname();
  const [navIndex, setNavIndex] = useState(-1);

  useEffect(() => {
    try {
      if (pathname === "/dashboard") {
        setNavIndex(0);
      }
      if (pathname === "/dashboard/electricity") {
        setNavIndex(1);
      }
      if (pathname === "/dashboard/gas") {
        setNavIndex(2);
      }
      if (pathname === "/dashboard/reports") {
        setNavIndex(3);
      }
      if (pathname === "/dashboard/account") {
        setNavIndex(4);
      }
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
            <ListItem key={text} >
              <ListItemButton onClick={() => handleClick(index, item.to)} className={navIndex === index ? "active-button" : ""} sx={{
                backgroundColor: "white",
                borderRadius: "37px",
                border: "2px solid black",
              }}>
                <ListItemText primary={text} className={navIndex === index ? "active-text" : ""} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <List style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "auto", backgroundColor: "#A5A5A5" }}>
        <ListItem key={"Account"}>
          <ListItemButton onClick={() => handleClick(4, "../dashboard/account")} sx={{
            backgroundColor: "white",
            borderRadius: "37px",
            border: "2px solid black"
          }} className={navIndex === 4 ? "active-button" : ""}>
            <ListItemText primary={"Account"} className={navIndex === 4 ? "active-text" : ""} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer >
  );
}
export default Sidebar;