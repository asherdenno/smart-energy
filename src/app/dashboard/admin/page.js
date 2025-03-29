'use client';
import React, { useState } from "react";
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";
import { styled } from '@mui/material/styles';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Add } from "@mui/icons-material";

//This will be replaced with the actual data from the database and 
//will be fetched from the backend so code here is temporary
const allUserRows = [
  ['User 1', 'Network manager'],
  ['User 2', 'City council']
];

// Styled components for table cells
const TbHeadCell = styled(TableCell)({
  fontSize: '20px',
  fontWeight: 600,
  padding: '10px 0 20px 0',
  textAlign: 'left',
  boxSizing: 'border-box',
  '&:last-child': {
    textAlign: 'right',
  }
});

const TbBodyCell = styled(TableCell)({
  padding: "10px 0",
  fontSize: "15px",
  textAlign: 'left',
  boxSizing: 'border-box',
  '&:last-child': {
    textAlign: 'right',
  },
});

const Admin = () => {
  const [users, setUsers] = useState(allUserRows);
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <main className={styles.content}>
      <nav>
        <Navbar title={"User Management"} hasCitySelect={false} />
      </nav>
      <div className={styles.greyContainer}>
        <div
          className={styles.space_between_flex_row}
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
            <input
              onChange={(e) => searchUser(e.target.value)}
              value={searchQuery}
              type="search"
              className={styles.searchBar}
              placeholder="Search users"
              style={{ maxWidth: "500px", width: "100%" }}
            />
            <Button
              variant="outlined"
              color="primary"
              size="large"
              sx={{
                color: "black",
                backgroundColor: "white",
                border: "black 1px solid",
                borderRadius: "10px",
                padding: "2px 30px",
                textTransform: "none",
                minWidth: "fit-content",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  border: "black 1px solid",
                  color: "black",
                },
              }}
            >
              Create new user <Add sx={{ fontSize: "23px", paddingLeft: "5px" }} />
            </Button>
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