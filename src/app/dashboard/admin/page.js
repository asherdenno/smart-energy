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

const allUserRows = [

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
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/users?page=1&pageSize=20`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const searchUser = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setUsers(allUserRows); // Reset back to the list of all users
    } else {
      const filteredUsers = users.filter((user) =>
        user.user_name.toLowerCase().includes(query.toLowerCase())
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

  const checkUserInput = () => {
    if (!checkUserInputMeetsRequirements()) {
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{10,}$/;
    return passwordRegex.test(password);
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

    setWarnings({ ...newWarnings });
    return allFieldsFilled;
  };

  const handleBlur = (id) => {
    const value = document.getElementById(id)?.value;
    setWarnings((prevWarnings) => ({
      ...prevWarnings,
      [id]: value ? "" : emptyFieldMsg,
    }));
  };

  const handleAddUser = async (userData) => {
    // Check if user input meets requirements
    if (!checkUserInputMeetsRequirements()) {
      alert('Please fix the input errors before submitting.');
      return; // Stop execution if validation fails
    }

    try {
      const response = await fetch('/api/add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('User added successfully');
        setOpenDialog(false); // Close the dialog
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
                      renderInput={(params) => <LargeInputBox {...params} placeholder="Enter network name" value="" onBlur={() => handleBlur("network")} />}
                    />
                    <span className={styles.warning} id="warningForSelection"> {warnings.network}</span>

                  </div>
                  :
                  <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                    <InputLabel htmlFor="city" sx={{ fontSize: "15px", fontWeight: "600" }}>Select city</InputLabel>
                    <AutocompleteField
                      id="city"
                      options={vacantCity}
                      renderInput={(params) => <LargeInputBox {...params} placeholder="Enter city name" value="" onBlur={() => handleBlur("city")} />}
                    />
                    <span className={styles.warning} id="warningForSelection"> {warnings.city}</span>
                  </div>
                }

                <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                  <InputLabel htmlFor="firstName" sx={{ fontSize: "15px", fontWeight: "600" }} >First name</InputLabel>
                  <LargeInputBox id="firstName" type="text" placeholder="Enter first name" onBlur={() => handleBlur("firstName")} />
                  <span className={styles.warning}>{warnings["firstName"]}</span>
                </div>

                <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                  <InputLabel htmlFor="lastName" sx={{ fontSize: "15px", fontWeight: "600" }}>Last name</InputLabel>
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
                  onClick={() => {
                    const userData = {
                      email: document.getElementById('email').value,
                      f_name: document.getElementById('firstName').value,
                      l_name: document.getElementById('lastName').value,
                      username: document.getElementById('firstName').value + document.getElementById('lastName').value,
                      password: document.getElementById('password').value,
                      account_type_id: activeRole === 'Network manager' ? 2 : 3,
                      network_filter_id: activeRole === 'Network manager' ? document.getElementById('network').value : null,
                      city_filter_id: activeRole === 'City council' ? document.getElementById('cities').value : null,
                    };
                    handleAddUser(userData);
                  }}
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
                <TbHeadCell>Name</TbHeadCell>
                <TbHeadCell>Role</TbHeadCell>
                <TbHeadCell >Manage user</TbHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <TableRow key={index}>
                    <TbBodyCell>{`${user.f_name} ${user.l_name}`}</TbBodyCell>
                    <TbBodyCell>
                      {user.account_type_id === 1
                        ? "Admin"
                        : user.account_type_id === 2
                          ? "Network Manager"
                          : "City Council"}
                    </TbBodyCell>
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