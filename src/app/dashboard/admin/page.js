'use client';
import React, { useState } from "react";
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";
import { GetUsers } from "../components/fetchUsersInfo";



import {
  Button, Table, TableBody, InputLabel, Autocomplete,
  TableCell, TableContainer, TableHead, TableRow, Paper,
  Dialog, DialogTitle, DialogContent, DialogContentText,
  DialogActions
} from "@mui/material";

import { Add } from "@mui/icons-material";

import {
  TbHeadCell, TbBodyCell, LargeBtn, AutocompleteField,
  ClassicBtn, InputBox, LargeInputBox
} from "../components/muiStyledComponents";
import { Label } from "recharts";


//This will be replaced with the actual data from the database and 
//will be fetched from the backend so code here is temporary
const allUserRows = [
  ['User 1', 'Network manager'],
  ['User 2', 'City council']
];

const vacantNetwork = [
  'Network 1',
  'Network 2'
];

const vacantCity = [
  'Halland',
  'alvsborg',
  'Vastra Gotaland',
];

const Admin = () => {
  const [users, setUsers] = useState(allUserRows);
  const [searchQuery, setSearchQuery] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const [activeRole, setActiveRole] = useState("Network manager");


  const searchUser = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setUsers(allUserRows); // reset back to the list of all user
    } else {
      const filteredUsers = allUserRows.filter((user) =>
        user[0].toLowerCase().includes(query.toLowerCase())
      );
      setUsers(filteredUsers);
    }
  };

  let dataValues = await GetUsers();
  console.log("Data values:", dataValues);

  return (


    <main className={styles.content}>
      <Navbar title={"User Management"} hasCitySelect={false} />
      <div className={styles.greyContainer}>
        <div
          className={styles.space_between_center_flex_row}
          style={{
            width: "100%",
            borderBottom: "1px solid black",
            padding: "10px 0",
            gap: "10px",
          }}
        >
          <h2>Manage users</h2>
          <div
            className={styles.right_center_flex_row}
            style={{ gap: "10px", width: "50%" }}
          >
            <InputBox
              onChange={(e) => searchUser(e.target.value)}
              value={searchQuery}
              type="search"
              placeholder="Search users"
              style={{ maxWidth: "500px", width: "100%" }}
            />
            <ClassicBtn
              variant="outlined"
              color="primary"
              onClick={() => setOpenDialog(true)}
            >
              Create new user <Add sx={{ fontSize: "23px", paddingLeft: "5px" }} />
            </ClassicBtn>
            <Dialog
              open={openDialog} onClose={() => setOpenDialog(false)}
              aria-labelledby="dialog-title"
              aria-describedby="dialog-description"
              slotProps={{
                backdrop: {
                  invisible: true,
                },
              }}
              sx={{
                "& .MuiDialog-paper": {
                  maxWidth: "500px",
                  border: "black 2px solid",
                  padding: "20px 23px",
                },

              }}>
              <DialogTitle
                id="dialog-title"
                sx={{
                  padding: "0",
                  fontSize: "25px",
                  fontWeight: "600",
                }}>
                New user</DialogTitle>
              <DialogContent
                id="dialog-description"
                sx={{
                  padding: "0",
                  gap: "10px",
                  display: "flex",
                  flexDirection: "column"
                }}>
                <DialogContentText sx={{ textColor: "black" }}>
                  To create a new user, please fill in the required information.
                </DialogContentText>

                <div className={styles.left_start_flex_column} style={{ gap: "3px" }}>
                  <InputLabel htmlFor="user-role" sx={{ fontSize: "15px", fontWeight: "600" }}>User role</InputLabel>
                  <div className={styles.center_center_flex_row} style={{ gap: "5px", width: "100%" }}>
                    <LargeBtn
                      sx={{
                        width: "100%",
                        backgroundColor: activeRole === "Network manager" ? "#919191" : "white",
                        border: activeRole === "Network manager" ? "1px solid black" : "1px solid grey",
                        color: activeRole === "Network manager" ? "white" : "black",
                        fontWeight: activeRole === "Network manager" ? "600" : "400",
                      }}
                      onClick={() => setActiveRole("Network manager")}
                    >Network manger
                    </LargeBtn>
                    <LargeBtn
                      sx={{
                        width: "100%",
                        backgroundColor: activeRole === "City council" ? "#919191" : "white",
                        border: activeRole === "City council" ? "1px solid black" : "1px solid grey",
                        color: activeRole === "City council" ? "white" : "black",
                        fontWeight: activeRole === "City council" ? "600" : "400",
                      }}
                      onClick={() => setActiveRole("City council")}
                    >City council
                    </LargeBtn>
                  </div>
                </div>

                {activeRole === "Network manager" ?
                  <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                    <InputLabel htmlFor="network" sx={{ fontSize: "15px", fontWeight: "600" }}>Select network </InputLabel>
                    <AutocompleteField
                      id="network"
                      options={vacantNetwork}
                      renderInput={(params) => <LargeInputBox {...params} placeholder="Enter network name" />}
                    />
                  </div>
                  :
                  <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                    <InputLabel htmlFor="city" sx={{ fontSize: "15px", fontWeight: "600" }}>Select city</InputLabel>
                    <AutocompleteField
                      id="city"
                      options={vacantCity}
                      renderInput={(params) => <LargeInputBox {...params} placeholder="Enter city name" />}
                    />
                  </div>
                }

                <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                  <InputLabel htmlFor="first-name" sx={{ fontSize: "15px", fontWeight: "600" }}>First name</InputLabel>
                  <LargeInputBox id="first-name" type="text" placeholder="Enter first name" />
                </div>

                <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                  <InputLabel htmlFor="last-name" sx={{ fontSize: "15px", fontWeight: "600" }}>Last name</InputLabel>
                  <LargeInputBox id="last-name" type="text" placeholder="Enter last name" />
                </div>

                <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                  <InputLabel htmlFor="email" sx={{ fontSize: "15px", fontWeight: "600" }}>Email</InputLabel>
                  <LargeInputBox id="email" type="text" placeholder="Enter email" />
                </div>

                <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                  <InputLabel htmlFor="password" sx={{ fontSize: "15px", fontWeight: "600" }}>Password</InputLabel>
                  <LargeInputBox id="password" type="password" placeholder="Enter password" />
                </div>

              </DialogContent>
              <DialogActions
                sx={{
                  padding: "20px 0 0 0",
                  display: "flex",
                  gap: "2px",
                }}>
                <LargeBtn
                  onClick={() => setOpenDialog(false)}
                >Create new user</LargeBtn>
                <LargeBtn
                  onClick={() => setOpenDialog(false)}
                >Cancel</LargeBtn>
              </DialogActions>
            </Dialog>
          </div>
        </div>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
            backgroundColor: "transparent",
            padding: "0 10px",
          }}
        >
          <Table
            sx={{
              width: "100%",
              tableLayout: "fixed",
            }}
            aria-label="user management table"
          >
            <TableHead>
              <TableRow sx={{ borderBottom: "1px grey solid" }}>
                <TbHeadCell>Name</TbHeadCell>
                <TbHeadCell>Role</TbHeadCell>
                <TbHeadCell >Manage user</TbHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((row, index) => (
                  <TableRow key={index}>
                    <TbBodyCell>{row[0]}</TbBodyCell>
                    <TbBodyCell>{row[1]}</TbBodyCell>
                    <TbBodyCell>
                      <Button>Manage user</Button>
                    </TbBodyCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TbBodyCell colSpan={3} style={{ textAlign: "center" }}>
                    {allUserRows.length > 0 ?
                      "No users found" :
                      "No users available! Create one to get started."}
                  </TbBodyCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </main>
  );
};

export default Admin;