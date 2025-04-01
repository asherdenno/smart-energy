import {fetchAnnualNetworkEnergy, fetchAnnualCityEnergy } from "@/lib/db";

const fetchFilteredCity = async () => {
    const data = await fetchAnnualCityEnergy(cityFilterId);
    console.log("fetchFilteredCity");
    return data;
}
const fetchFilteredNetwork = async () => {
    const data = await fetchAnnualNetworkEnergy(networkFilterId);
    console.log("fetchFilteredNetwork");
    return data;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    
    const { accountTypeId, cityFilterId, networkFilterId } = req.body;

    if (!accountTypeId) {
        return res.status(400).json({ message: 'account_type_id not detected' });
    }

    try {
        if (accountTypeId = 2){
        const data = fetchFilteredCity(cityFilterId);
        console.log("fetchFilteredCity2");
        }
        if (accountTypeId = 3){
        const data = fetchFilteredNetwork(networkFilterId);
        console.log("fetchFilteredNetwork2");
        }
        
        res.status(200).json({ message: 'Filtered data retrieved', data });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}