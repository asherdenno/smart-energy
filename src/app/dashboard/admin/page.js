'use client';
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";

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


const vacantNetwork = [
  'Network 1',
  'Network 2'
];

const vacantCity = [
  'Halland',
  'alvsborg',
  'Vastra Gotaland',
];

let allUserRows = [];

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track the total number of pages

  const fetchUsers = async (page = 1) => {
    try {
      const pageSize = 10; // Set the number of users displayed per page
      const response = await fetch(`/api/fetch-users?page=${page}&pageSize=${pageSize}`);
      const data = await response.json();
      allUserRows = data.users; // Update allUserRows with fetched data
      setUsers(data.users); // Update the users state
      setTotalPages(data.totalPages); // Update the total pages
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage); // Fetch users for the current page
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchUsers(newPage); // Fetch users for the new page
    }
  };

  const searchUser = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setUsers(allUserRows);
    } else {
      const filteredUsers = allUserRows.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      setUsers(filteredUsers);
    }
  };


  const [openDialog, setOpenDialog] = useState(false);

  const [activeRole, setActiveRole] = useState("Network manager");

  const [warning, setWarningDisplay] = useState(false);

  const [warnings, setWarnings] = useState({
    network: "",
    city: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const fields = [
    { id: "network" },
    { id: "city" },
    { id: "firstName" },
    { id: "lastName" },
    { id: "email" },
    { id: "password" },
  ];

  let emptyFieldMsg = "Field cannot be empty";

  const validateEmail = (email) => {
    if (email.includes("@") && email.includes(".")) {
      return true;
    } else {
      return false;
    }
  };
  const validatePassword = (password) => {
    if (password.length < 10) {
      return false;
    }
    let hasUppercase = false;
    for (let i = 0; i < password.length; i++) {
      if (password[i] === password[i].toUpperCase() && isNaN(password[i])) {
        hasUppercase = true;
        break;
      }
    }
    if (!hasUppercase) {
      return false;
    }
    let hasLowercase = false;
    for (let i = 0; i < password.length; i++) {
      if (password[i] === password[i].toLowerCase() && isNaN(password[i])) {
        hasLowercase = true;
        break;
      }
    }
    if (!hasLowercase) {
      return false;
    }
    const specialCharacters = "!@#$%^&*()_+[]{}|;:',.<>?/";
    let hasSpecialCharacter = false;
    for (let i = 0; i < password.length; i++) {
      if (specialCharacters.includes(password[i])) {
        hasSpecialCharacter = true;
        break;
      }
    }
    if (!hasSpecialCharacter) {
      return false;
    }
    return true;
  };

  const checkUserInputMeetsRequirements = () => {
    let allFieldsFilled = true;

    const newWarnings = { ...warnings };

    fields.forEach(({ id }) => {
      const inputElement = document.getElementById(id);
      const value = inputElement?.value;

      if (!value) {
        allFieldsFilled = false;
        newWarnings[id] = emptyFieldMsg;
        if (inputElement) inputElement.value = ""; // Clear the value if empty
      } else {
        if (id === "email" && !validateEmail(value)) {
          allFieldsFilled = false;
          newWarnings[id] = "Invalid email format";
        } else if (id === "password" && !validatePassword(value)) {
          allFieldsFilled = false;
          newWarnings[id] = "Password must be at least 10 characters, include 1 uppercase, 1 lowercase, and 1 special character";
        } else {
          newWarnings[id] = "";
          allFieldsFilled = true;
        }
      }
    });

    setWarnings({ ...newWarnings }); // Update warnings state with new warnings making the react re-render
    return allFieldsFilled;
  };

  const handleBlur = (id) => {
    const value = document.getElementById(id)?.value;
    setWarnings((prevWarnings) => ({
      ...prevWarnings, // done to keep previous warninings while updating the new warning
      [id]: value ? "" : emptyFieldMsg,
    }));
  };

  const handleAddUser = async () => {
    if (!checkUserInputMeetsRequirements()) {
      return;
    }

    // Prepare user data
    const userData = {
      email: document.getElementById('email').value,
      f_name: document.getElementById('firstName').value,
      l_name: document.getElementById('lastName').value,
      username: `${document.getElementById('firstName').value}${document.getElementById('lastName').value}`,
      password: document.getElementById('password').value,
      account_type_id: activeRole === 'Network manager' ? 2 : 3,
      network_filter_id: activeRole === 'Network manager' ? document.getElementById('network').value : null,
      city_filter_id: activeRole === 'City council' ? document.getElementById('city').value : null,
    };

    try {
      // Send user data to the backend
      const response = await fetch('/api/add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('User added successfully');
        setOpenDialog(false);
        fetchUsers(); // Refresh the user list
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    }
  };

  return (
    <main className={styles.content}>
      <Navbar title={"User Management"} hasCitySelect={false} hasNetworkSelect={false} />
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
          <h2>Manage Users</h2>
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
              Create New User <Add sx={{ fontSize: "23px", paddingLeft: "5px" }} />
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
                New User</DialogTitle>
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
                    >Network Manager
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
                    >City Council
                    </LargeBtn>
                  </div>
                </div>

                {activeRole === "Network manager" ?
                  <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                    <InputLabel htmlFor="network" sx={{ fontSize: "15px", fontWeight: "600" }}>Select network </InputLabel>
                    <AutocompleteField
                      id="network"
                      options={vacantNetwork}
                      renderInput={(params) => <LargeInputBox {...params} placeholder="Enter network name" value="" onBlur={() => handleBlur("network")} />}
                    />
                    <span className={styles.warning} id="warningForSelection"> {warnings.network}</span>

                  </div>
                  :
                  <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                    <InputLabel htmlFor="city" sx={{ fontSize: "15px", fontWeight: "600" }}>Select City</InputLabel>
                    <AutocompleteField
                      id="city"
                      options={vacantCity}
                      renderInput={(params) => <LargeInputBox {...params} placeholder="Enter city name" value="" onBlur={() => handleBlur("city")} />}
                    />
                    <span className={styles.warning} id="warningForSelection"> {warnings.city}</span>
                  </div>
                }

                <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                  <InputLabel htmlFor="firstName" sx={{ fontSize: "15px", fontWeight: "600" }} >First Name</InputLabel>
                  <LargeInputBox id="firstName" type="text" placeholder="Enter first name" onBlur={() => handleBlur("firstName")} />
                  <span className={styles.warning}>{warnings["firstName"]}</span>
                </div>

                <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                  <InputLabel htmlFor="lastName" sx={{ fontSize: "15px", fontWeight: "600" }}>Last Name</InputLabel>
                  <LargeInputBox id="lastName" type="text" placeholder="Enter last name" onBlur={() => handleBlur("lastName")} />
                  <span className={styles.warning}>{warnings["lastName"]}</span>
                </div>

                <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                  <InputLabel htmlFor="email" sx={{ fontSize: "15px", fontWeight: "600" }}>Email</InputLabel>
                  <LargeInputBox id="email" type="text" placeholder="Enter email" onBlur={() => handleBlur("email")} />
                  <span className={styles.warning}>{warnings["email"]}</span>
                </div>

                <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                  <InputLabel htmlFor="password" sx={{ fontSize: "15px", fontWeight: "600" }}>Password</InputLabel>
                  <LargeInputBox id="password" type="text" placeholder="Enter password" onBlur={() => handleBlur("password")} />
                  <span className={styles.warning}>{warnings["password"]}</span>
                </div>

              </DialogContent>
              <DialogActions
                sx={{
                  padding: "20px 0 0 0",
                  display: "flex",
                  gap: "2px",
                }}>
                <LargeBtn
                  onClick={handleAddUser}
                >
                  Create new user
                </LargeBtn>
                <LargeBtn
                  onClick={() => { setOpenDialog(false); setWarningDisplay(false); }}
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
                <TbHeadCell sx={{ maxWidth: "10px" }}>#</TbHeadCell>
                <TbHeadCell>Name</TbHeadCell>
                <TbHeadCell>Role</TbHeadCell>
                <TbHeadCell>Filters</TbHeadCell>
                <TbHeadCell>Manage User</TbHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  console.log(user),
                  <TableRow key={index}>
                    <TbBodyCell>{(currentPage - 1) * 10 + index + 1}</TbBodyCell>
                    <TbBodyCell>{`${user.f_name} ${user.l_name}`}</TbBodyCell>
                    <TbBodyCell>
                      {user.account_type_id === 1
                        ? "Admin"
                        : user.account_type_id === 2
                        ? "Network Manager"
                        : "City Council"}
                    </TbBodyCell>
                    <TbBodyCell>
                      {user.account_type_id === 2
                        ? user.network_filter_id || "No network assigned"
                        : user.account_type_id === 3
                        ? user.city_filter_id || "No city assigned"
                        : "N/A"}
                    </TbBodyCell>
                    <TbBodyCell>
                      <Button>Manage user</Button>
                    </TbBodyCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TbBodyCell colSpan={5} style={{ textAlign: "center" }}>
                    {allUserRows.length > 0
                      ? "No users found"
                      : "No users available! Create one to get started."}
                  </TbBodyCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={styles.space_between_center_flex_row}>
          <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Admin;