'use client';
import { useState } from 'react';
import { useEffect } from "react";

const Test = () => {
    const [list, setList] = useState([]);
    const getAccounts = async () => {
        try {
            const response = await fetch('/api/get-test');
            const data = await response.json();
            console.log(data);
            setList(data);
        } catch (error) {
            console.error("API Error:", error);
        }
    }

    useEffect(() => {
        getAccounts();
    }, []);

    return (
      <div>
        <p>This is the Test page...</p>
        <br />
        {list.map((item, index) => (
            <ul key={index}>
                <li>Data ID: {item.data_id}</li>
                <li>Purchase Area: {item.purchase_area}</li>
                <li>Street: {item.street}</li>
                <li>Zipcode From: {item.zipcode_from}</li>
                <li>Zipcode To: {item.zipcode_to}</li>
                <li>Number of Connections: {item.num_connections}</li>
                <li>Delivery Percentage: {item.delivery_perc}</li>
                <li>Percentage of Active Connections: {item.perc_of_active_connections}</li>
                <li>Type of Connection: {item.type_of_connection}</li>
                <li>Type Connection Percentage: {item.type_conn_perc}</li>
                <li>Annual Consumption: {item.annual_consume}</li>
                <li>Annual Consumption Low Tariff Percentage: {item.annual_consume_lowtarif_perc}</li>
                <li>Smart Meter Percentage: {item.smartmeter_perc}</li>
                <br />
            </ul>
        ))}
      </div>
    );
  }
  export default Test;