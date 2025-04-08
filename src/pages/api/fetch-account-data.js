import { findUsername, fetchUserData, fetchAnnualNetworkEnergy, fetchAnnualCityEnergy } from "@/lib/db";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    
    const { account_id } = req.body;
    account_id = 2;

    if (!account_id) {
        return res.status(400).json({ message: 'Account ID is required' });
    }

    try {
        const data = await fetchUserData();
        res.status(200).json({ message: 'Filtering by account ID is not yet implemented', data });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}