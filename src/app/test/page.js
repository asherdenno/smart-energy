'use client';
import { useState, useEffect } from 'react';
import Link from "next/link";
import {
    Box,
    Typography,
    List,
    ListItem, 
    ListItemText,
    CircularProgress, 
    Button
} from "@mui/material";

const Test = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [list, setList] = useState([]);
    
    const getAccounts = async () => {
        try {
            const response = await fetch('/api/get-test');
            const data = await response.json();
            console.log(data);
            setList(data);
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error("API Error:", error);
            setError(error.message);
            setLoading(false); // Set loading to false even if there's an error
        }
    }

    useEffect(() => {
        getAccounts();
    }, []);

    return (
      <Box sx={{ padding: '20px'}}>
        <Link href="../dashboard"><Button variant="contained" color="primary">Go home</Button></Link>
        <Typography>This is the Test page...</Typography>
        {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress />
            </Box>
        ) : error ? (<Typography sx={{color: "red"}}>Error: {error}</Typography>) : (
            <List>
            {list.map((item, index) => (
                <ListItem key={index}>
                    <ListItemText>Data ID: {item.data_id}</ListItemText>
                    <ListItemText>Purchase Area: {item.purchase_area}</ListItemText>
                    <ListItemText>Street: {item.street}</ListItemText>
                    <ListItemText>Zipcode From: {item.zipcode_from}</ListItemText>
                    <ListItemText>Zipcode To: {item.zipcode_to}</ListItemText>
                    <ListItemText>Number of Connections: {item.num_connections}</ListItemText>
                    <ListItemText>Delivery Percentage: {item.delivery_perc}</ListItemText>
                    <ListItemText>Percentage of Active Connections: {item.perc_of_active_connections}</ListItemText>
                    <ListItemText>Type of Connection: {item.type_of_connection}</ListItemText>
                    <ListItemText>Type Connection Percentage: {item.type_conn_perc}</ListItemText>
                    <ListItemText>Annual Consumption: {item.annual_consume}</ListItemText>
                    <ListItemText>Annual Consumption Low Tariff Percentage: {item.annual_consume_lowtarif_perc}</ListItemText>
                    <ListItemText>Smart Meter Percentage: {item.smartmeter_perc}</ListItemText>
                </ListItem>
            ))}
            </List>
            )
        }
      </Box>
    );
}

export default Test;