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



const vacantCity = [
  'Halland',
  'alvsborg',
  'Vastra Gotaland',
];

let userRecords = [];
let unfilterdPagesCount = 1; // to keep track of the total pages for the filtered users


const Admin = () => {
  // Dialog states
  const [openNewUserDialog, setOpenNewUserDialog] = useState(false);
  const [openModifyUserDialog, setOpenModifyUserDialog] = useState(false);

  // User management
  const [users, setUsers] = useState([]);
  const [activeRole, setActiveRole] = useState("Network manager");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserDataModified, setIsUserDataModified] = useState(false);
  const [fetchingUsers, setFetchingUsers] = useState(true);

  // Unassigned networks and cities states
  const [unassignedNetworks, setUnassignedNetworks] = useState([]);
  const [isNetworksFetched, setIsNetworksFetched] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [unassignedCities, setUnassignedCities] = useState([]);
  const [isCitiesFetched, setIsCitiesFetched] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [fetchingNextSetOfCities, setfetchingNextSetOfCities] = useState(false);
  const [cityQuery, setCityQuery] = useState(""); // to keep track of the last city query


  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // Set the number of users displayed per page

  const refetchData = () => {
    fetchUsers(currentPage);
    fetchUnassignedNetworks();
    fetchUnassignedCities();
  }

  const fetchUsers = async (page = 1) => {
    try {
      const response = await fetch(`/api/fetch-users?page=${page}&pageSize=${pageSize}`);
      const data = await response.json();
      userRecords = data.users;
      setUsers(userRecords);
      setTotalPages(data.totalPages);
      unfilterdPagesCount = data.totalPages;
      console.log(userRecords);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setFetchingUsers(false);
    setCurrentPage(page);
  };

  // Fetch unassigned And assigned networks and cities on page load
  useEffect(() => {
    refetchData();
  }, []);

  // Reset isUserDataModified state when dialog is closed
  useEffect(() => {
    if (!openModifyUserDialog) {
      setIsUserDataModified(false);
    }
  }, [openModifyUserDialog]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchUsers(newPage);
    }
  };

  // Resetting the dialog state when closed, for when the dialog is opened again
  const handleManageUser = (user) => {
    setSelectedUser(user);
    setOpenModifyUserDialog(true);
    resetWarnings();
  };

  const [warnings, setWarnings] = useState({
    network: "",
    city: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const resetWarnings = () => {
    setWarnings({
      network: "",
      city: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

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
      if ((id === "city" && activeRole === "Network manager") || (id === "network" && activeRole === "City council")) {
        return;
      } else if (!value) {
        allFieldsFilled = false;
        newWarnings[id] = emptyFieldMsg;
        console.log("Empty field:", id);
        console.log("Value:", value);
      } else {
        if (id === "email" && !validateEmail(value)) {
          allFieldsFilled = false;
          newWarnings[id] = "Invalid email format";
        } else if (id === "password" && !validatePassword(value)) {
          allFieldsFilled = false;
          newWarnings[id] = "Password must be at least 10 characters, include 1 uppercase, 1 lowercase, and 1 special character";
        } else {
          newWarnings[id] = "";
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
      console.log("active role is :", selectedCity);
      alert("Please fill all fields correctly");
      return;
    }

    const userData = {
      email: document.getElementById('email').value,
      f_name: document.getElementById('firstName').value,
      l_name: document.getElementById('lastName').value,
      password: document.getElementById('password').value,
      account_type_id: activeRole === 'City council' ? 2 : 3,
      city_filter_id: activeRole === 'City council' ? selectedCity?.city_filter_id  === 0 ? "0" : selectedCity?.city_filter_id : null,
      network_filter_id: activeRole === 'Network manager' ? selectedNetwork.network_filter_id === 0 ? "0" : selectedNetwork?.network_filter_id : null,
    };

    try {
      const response = await fetch('/api/fetch-add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('User added successfully');
        setOpenNewUserDialog(false);
        refetchData(); // Refresh the user list
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    }
  };

  const checkDataModified = () => {
    let isModified = false;

    const userData = {
      email: document.getElementById('email').value,
      f_name: document.getElementById('firstName').value,
      l_name: document.getElementById('lastName').value,
      password: document.getElementById('password').value,
    };

    for (const key in userData) {
      if (userData[key] !== selectedUser[key]) {
        isModified = true;
        console.log("Data modified:", key);
        break;
      }
    }
    setIsUserDataModified(isModified);
    return isModified;
  }

  const handleModifyUser = async () => {
    if (!checkUserInputMeetsRequirements()) {
      alert("Please fill all fields correctly");
      return;
    }

    const userData = {
      account_id: selectedUser.account_id,
      email: document.getElementById('email').value,
      f_name: document.getElementById('firstName').value,
      l_name: document.getElementById('lastName').value,
      password: document.getElementById('password').value,
    };

    try {
      const response = await fetch('/api/fetch-modify-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('User modified successfully');
        setOpenModifyUserDialog(false);
        fetchUsers(); // Refresh the user list
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error modifying user:', error);
      alert('Failed to modify user');
    }
  }

  const handleDeleteUser = async () => {
    try {
      const response = await fetch('/api/fetch-delete-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account_id: selectedUser.account_id }),
      });
      if (response.ok) {
        alert('User deleted successfully');
        setOpenModifyUserDialog(false);
        refetchData(); // Refresh the user list
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    }
    catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  }

  const searchUser = async (query, page = 1) => {
    setFetchingUsers(true);
    if (query === "") {
      console.log("Fetching all users");
      setUsers(userRecords);
      console.log("Unfiltered pages count:", userRecords);
      setTotalPages(unfilterdPagesCount);
      setCurrentPage(1);
    }
    else {
      try {
        console.log("Searching for users with query:", query, page, pageSize);
        const response = await fetch(`/api/fetch-find-users?searchTerm=${query}&page=${page}&pageSize=${pageSize}`);
        const data = await response.json();
        setUsers(data.users);
        setTotalPages(data.totalPages);
      }
      catch (error) {
        console.error("Error searching users:", error);
      }
    }
    setFetchingUsers(false);
  };

  const fetchUnassignedNetworks = async () => {
    try {
      const response = await fetch('/api/fetch-unassigned-networks');
      const data = await response.json();

      console.log("API Response for Unassigned Networks:", data); // Debugging the response

      if (Array.isArray(data)) {
        const formattedData = await data.map((network) => {
          network.label = network.net_manager;
          delete network.net_manager;
          return network;
        });
        setUnassignedNetworks(formattedData);
      } else {
        console.error("Unexpected API response format:", data);
        setUnassignedNetworks([]); // Fallback to an empty array
      }

      setIsNetworksFetched(true);
      return data;
    } catch (error) {
      console.error('Error fetching unassigned networks:', error);
      setUnassignedNetworks([]); // Fallback to an empty array in case of error
      return [];
    }
  }

  const searchUnassignedCities = async (searchInput) => {
    try {
      const response = await fetch(`/api/fetch-unassigned-cities?searchString=${searchInput}&searchInitiated=${true}&listLength=${unassignedCities.length}`);
      const data = await response.json();
      let fetchedCities = unassignedCities;
      const formattedData = await data.map((city) => ({
        label: city.city, // Place label first
        city_filter_id: city.city_filter_id,
      }));
      const combinedData = [...fetchedCities, ...formattedData];
      setUnassignedCities(combinedData);
      console.log(" API response :", combinedData);
      setIsCitiesFetched(true);
      return data;
    } catch (error) {
      console.error('Error searching unassigned cities:', error);
      return [];
    }
  }

  const fetchUnassignedCities = async () => {
    try {
      const response = await fetch(`/api/fetch-unassigned-cities?nextListInitiated=${true}&listLength=${unassignedCities.length}`);
      const data = await response.json();
      let fetchedCities = unassignedCities;
      const formattedData = data.map((city) => ({
        label: city.city, // Place label first
        city_filter_id: city.city_filter_id,
      }));
      const combinedData = [...fetchedCities, ...formattedData];
      setUnassignedCities(combinedData);
      console.log("API response :", combinedData);
      setIsCitiesFetched(true);
      return data;
    } catch (error) {
      console.error('Error fetching unassigned cities:', error);
      return [];
    }
  }

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
              type="search"
              placeholder="Search users"
              style={{ maxWidth: "500px", width: "100%" }}
            />
            <ClassicBtn
              variant="outlined"
              color="primary"
              onClick={() => {
                setOpenNewUserDialog(true);
                resetWarnings();
              }}
            >
              Create New User <Add sx={{ fontSize: "23px", paddingLeft: "5px" }} />
            </ClassicBtn>
            <Dialog
              open={openNewUserDialog} onClose={() => setOpenNewUserDialog(false)}
              aria-labelledby="dialog-title"
              aria-describedby="dialog-description"
              slotProps={{
                backdrop: {
                  invisible: true,
                },
              }}
              sx={{
                "& .MuiDialog-paper": {
                  maxWidth: "600px",
                  width: "100%",
                  border: "black 1px solid",
                  padding: "20px 23px",
                  borderRadius: "12px",
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
                        backgroundColor: activeRole === "Network manager" ? "#919191" : "whit</footer>e",
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

                {activeRole === "Network manager" && (
                  <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                    <InputLabel htmlFor="network" sx={{ fontSize: "15px", fontWeight: "600" }}>
                      Select Network
                    </InputLabel>
                    <AutocompleteField
                      id="network"
                      options={unassignedNetworks}
                      loading={!isNetworksFetched}
                      onChange={(event, value) => {
                        setSelectedNetwork(value);
                        console.log("Selected network:", value);
                      }}
                      renderInput={(params) => (
                        <LargeInputBox
                          {...params}
                          placeholder="Enter network name"
                          onBlur={() => handleBlur("network")}
                        />
                      )}
                    />
                    <span className={styles.warning} id="warningForSelection">
                      {warnings.network}
                    </span>
                  </div>
                )}

                {activeRole === "City council" && (
                  <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                    <InputLabel htmlFor="city" sx={{ fontSize: "15px", fontWeight: "600" }}>
                      Select City
                    </InputLabel>
                    <AutocompleteField
                      id="city"
                      options={unassignedCities}
                      loading={!isCitiesFetched}
                      getOptionDisabled={(option) =>
                        option.disabled || option.label === "Loading..."
                      }
                      onChange={(event, value) => {
                        setSelectedCity(value);
                        console.log("Selected city:", value);
                      }}
                      onInputChange={(event, value) => {
                        setCityQuery(value);
                        if (value === "") {
                          setUnassignedCities([]);
                          setIsCitiesFetched(false);
                          fetchUnassignedCities();
                        }
                        else {
                          setUnassignedCities([]);
                          setIsCitiesFetched(false);
                          searchUnassignedCities(cityQuery);
                        }
                      }}
                      slotProps={{
                        listbox: {
                          onScroll: async (event) => {
                            const listboxNode = event.currentTarget;
                            // REF: https://codesandbox.io/p/sandbox/confident-kare-5n6i6?file=%2Fsrc%2FAutocomplete.js
                            // https://github.com/mui/material-ui/issues/30249
                            // Check if scrolled to the bottom
                            if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight - 50 && fetchingNextSetOfCities === false) {
                              console.log("Reached the bottom of the dropdown");
                              setfetchingNextSetOfCities(true);
                              setUnassignedCities((prevCity) => [...prevCity, { label: "Loading...", network_filter_id: null, disabled: true }]);

                              if (cityQuery !== "") {
                                await searchUnassignedCities(cityQuery);
                              }
                              else {
                                await fetchUnassignedCities();
                              }


                              setfetchingNextSetOfCities(false);
                            }
                          },
                        },
                      }}
                      renderInput={(params) =>
                        <LargeInputBox {...params}
                          placeholder="Enter city name"
                          onBlur={() => handleBlur("city")} />}
                    />
                    <span className={styles.warning} id="warningForSelection"> {warnings.city}</span>
                  </div>
                )}

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
                <LargeBtn onClick={handleAddUser} >
                  Create new user
                </LargeBtn>
                <LargeBtn
                  onClick={() => { setOpenNewUserDialog(false); }}
                >Cancel</LargeBtn>
              </DialogActions>
            </Dialog>

            <Dialog
              open={openModifyUserDialog} onClose={() => setOpenModifyUserDialog(false)}
              aria-labelledby="dialog-title"
              aria-describedby="dialog-description"
              slotProps={{
                backdrop: {
                  invisible: true,
                },
              }}
              sx={{
                "& .MuiDialog-paper": {
                  maxWidth: "600px",
                  width: "100%",
                  border: "black 1px solid",
                  padding: "20px 23px",
                  borderRadius: "12px",
                },

              }}>
              <DialogTitle
                id="dialog-title"
                sx={{
                  padding: "0",
                  fontSize: "25px",
                  fontWeight: "600",
                }}>
                Manage {selectedUser?.username}</DialogTitle>
              <DialogContent
                id="dialog-description"
                sx={{
                  padding: "0",
                  gap: "10px",
                  display: "flex",
                  flexDirection: "column"
                }}>
                <DialogContentText sx={{ textColor: "black" }}>
                  Here you can manage the selected user. You can edit their information or delete them.
                </DialogContentText>


                {/* HERE WILL GET USER DATA AND ASSIGN THE DATA AND LET THE ADMIN EDIT */}
                {selectedUser?.account_type_id === 2 ? (
                  <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                    <InputLabel htmlFor="city" sx={{ fontSize: "15px", fontWeight: "600" }}>
                      Managed city
                    </InputLabel>
                    <LargeInputBox
                      id="city"
                      value={selectedUser.city_name}
                      disabled
                    />
                  </div>

                ) : selectedUser?.account_type_id === 3 ? (
                  <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                    <InputLabel htmlFor="network" sx={{ fontSize: "15px", fontWeight: "600" }}>
                      Managed network
                    </InputLabel>
                    <LargeInputBox
                      id="network"
                      value={selectedUser.network_name}
                      disabled
                    />
                  </div>
                ) : (<> </>)
                }
                <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                  <InputLabel htmlFor="firstName" sx={{ fontSize: "15px", fontWeight: "600" }}>
                    First Name
                  </InputLabel>
                  <LargeInputBox
                    id="firstName"
                    type="text"
                    placeholder="Enter first name"
                    defaultValue={selectedUser?.f_name || ""}
                    onChange={() => setIsUserDataModified(true)}
                    onBlur={() => { handleBlur("firstName"); checkDataModified(); }}
                  />
                  <span className={styles.warning}>{warnings["firstName"]}</span>
                </div>
                <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                  <InputLabel htmlFor="lastName" sx={{ fontSize: "15px", fontWeight: "600" }}>
                    Last Name
                  </InputLabel>
                  <LargeInputBox
                    id="lastName"
                    type="text"
                    placeholder="Enter last name"
                    defaultValue={selectedUser?.l_name || ""}
                    onChange={() => setIsUserDataModified(true)}
                    onBlur={() => { handleBlur("lastName"); checkDataModified(); }}
                  />
                  <span className={styles.warning}>{warnings["lastName"]}</span>
                </div>
                <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                  <InputLabel htmlFor="email" sx={{ fontSize: "15px", fontWeight: "600" }}>
                    Email
                  </InputLabel>
                  <LargeInputBox
                    id="email"
                    type="text"
                    placeholder="Enter email"
                    defaultValue={selectedUser?.email || ""}
                    onChange={() => setIsUserDataModified(true)}
                    onBlur={() => { handleBlur("email"); checkDataModified(); }}
                  />
                  <span className={styles.warning}>{warnings["email"]}</span>
                </div>
                <div className={styles.left_start_flex_column} style={{ gap: "5px" }}>
                  <InputLabel htmlFor="password" sx={{ fontSize: "15px", fontWeight: "600" }}>
                    Password
                  </InputLabel>
                  <LargeInputBox
                    id="password"
                    type="text"
                    placeholder="Enter password"
                    defaultValue={selectedUser?.password || ""}
                    onChange={() => setIsUserDataModified(true)}
                    onBlur={() => { handleBlur("password"); checkDataModified(); }}
                  />
                  <span className={styles.warning}>{warnings["password"]}</span>
                </div>

              </DialogContent>
              <DialogActions
                sx={{
                  display: "flex",
                  direction: "row",
                  padding: "10px 0 0 0",
                  gap: "10px",
                  justifyContent: "space-between",
                  alignItems: "right",
                }}>
                <div>
                  <LargeBtn
                    style=
                    {{
                      display: isUserDataModified ? "block" : "none",
                      transition: "all 2s ease",
                    }}
                    color="primary"
                    onClick={() => handleModifyUser()}>
                    Save
                  </LargeBtn>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <LargeBtn onClick={() => setOpenModifyUserDialog(false)} color="primary">
                    Close
                  </LargeBtn>
                  <LargeBtn onClick={() => handleDeleteUser()} color="primary">
                    Delete User
                  </LargeBtn>
                </div>
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
              tableLayout: "auto",
            }}
            aria-label="user management table"
          >
            <TableHead>
              <TableRow sx={{ borderBottom: "1px grey solid" }}>
                <TbHeadCell sx={{ minWidth: "40px" }}>ID</TbHeadCell>
                <TbHeadCell>Name</TbHeadCell>
                <TbHeadCell>User Name</TbHeadCell>
                <TbHeadCell>Role</TbHeadCell>
                <TbHeadCell>Role ID</TbHeadCell>
                <TbHeadCell>Role name</TbHeadCell>
                <TbHeadCell>Manage User</TbHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchingUsers ? (
                <TableRow>
                  <TbBodyCell colSpan={1000} style={{ textAlign: "center" }}>
                    Loading...
                  </TbBodyCell>
                </TableRow>
              ) : users?.length > 0 ? (
                users.map((user, index) => (
                  // console.log(user),
                  <TableRow key={index}>
                    <TbBodyCell>{user.account_id}</TbBodyCell>
                    <TbBodyCell>{`${user.f_name} ${user.l_name}`}</TbBodyCell>
                    <TbBodyCell>{`${user.username}`}</TbBodyCell>
                    <TbBodyCell>
                      {user.account_type_id === 1
                        ? "Admin"
                        : user.account_type_id === 2
                          ? "City Council"
                          : "Network Manager"}
                    </TbBodyCell>
                    <TbBodyCell>
                      {user.account_type_id === 2
                        ? user.city_filter_id || "No city assigned" // Fallback for null or undefined
                        : user.account_type_id === 3
                          ? user.network_filter_id === 0 ? "0" //Check if network_filter_id is 0 for exclusive network (Coteq Netbeheer BV) because 0 is marked as null
                            : user.network_filter_id || "No network assigned" // Fallback for null or undefined
                          : "N/A"}
                    </TbBodyCell>
                    <TbBodyCell>
                      {user.account_type_id === 2
                        ? user.city_name || "No city assigned" // Fallback for null or undefined
                        : user.account_type_id === 3
                          ? user.network_name || "No network assigned" // Fallback for null or undefined
                          : "N/A"}
                    </TbBodyCell>
                    <TbBodyCell>
                      <Button onClick={() => handleManageUser(user)}>Manage user</Button>
                    </TbBodyCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TbBodyCell colSpan={1000} style={{ textAlign: "center" }}>
                    {userRecords?.length > 0
                      ? "No users found"
                      : "No users available! Create one to get started."}
                  </TbBodyCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={styles.space_between_center_flex_row}>
          <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Admin;