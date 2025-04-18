import path from 'path';
import fs from 'fs';
import { fetchFilteredEnergyData } from '@/lib/db';
import { FilterString } from '@/app/dashboard/context/NavbarContext';
// pages\api\download-annual-energy-data.js
// const filterString = " d.city = 'ENTER'";
// const filterString = " d.city != 'ENTER'";
const filterString = FilterString; 
export default async function handler(req, res) {
    try {
        console.log("fetching data for csv");
        const dataForCSV = await fetchFilteredEnergyData(filterString);
        console.log("fetched data for csv");
        const headers = Object.keys(dataForCSV[0]).join(',') + '\n';
        const rows = dataForCSV.map(row => Object.values(row).join(',')).join('\n');
        const csvContent = headers + rows;
         
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=filtered_data.csv');
        res.status(200).send(csvContent);
    } catch (error) {
        console.error("Error in api for csv:", error);
        res.status(500).json({ error: error.message });
    }
}