'use client';
import Navbar from "../components/navbar";
import styles from "@/app/page.module.css";
import { styled } from '@mui/material/styles';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Add } from "@mui/icons-material";

//This will be replaced with the actual data from the database and 
//will be fetched from the backend so code here is temporary
const userRows = [
  ['User 1', 'Network manager'],
  ['User 2', 'City council']
]

const TbHeadCell = styled(TableCell)({
  fontSize: '20px',
  fontWeight: 600,
  padding: '10px 0 20px 0'
});

const TbBodyCell = styled(TableCell)({
  padding: "10px 0",
  fontSize: "15px"
});

const Admin = () => {
  return (
    <main className={styles.content}>
      <nav>
        <Navbar title={"User Mangment"} hasCitySelect={false} />
      </nav>
      <div className={styles.greyContainer}>
        <div className={styles.space_between_flex_row} style={{ borderBottom: "1px solid black", padding: "10px 0" }}>
          <h2>Manage users </h2>
          <Button variant="outlined" color="primary" size="large"
            sx={{
              color: 'black',
              backgroundColor: "white",
              border: "black 1px solid",
              borderRadius: "10px",
              padding: "2px 30px",
              textTransform: 'none',
              '&:hover': {
                backgroundColor: "#f0f0f0",
                border: "black 1px solid",
                color: 'black'
              }
            }}>Create new user <Add sx={{ fontSize: "23px", paddingLeft: "5px" }} /> </Button>
        </div>

        <TableContainer component={Paper} sx={{ boxShadow: 'none', backgroundColor: 'transparent', padding: "0 10px" }}>
          <Table sx={{ width: "100%" }} aria-label="user management table">
            <TableHead>
              <TableRow sx={{ borderBottom: "1px grey solid" }} >
                <TbHeadCell >Name</TbHeadCell>
                <TbHeadCell >Role</TbHeadCell>
                <TbHeadCell align="right">Manage user</TbHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userRows.map((row) => (
                <TableRow key={row[0]}>
                  <TbBodyCell component="th" scope="row">
                    {row[0]}
                  </TbBodyCell>
                  <TbBodyCell >{row[1]}</TbBodyCell>
                  <TbBodyCell align="right" ><Button>Manage user</Button></TbBodyCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </main>
  );
}

export default Admin;