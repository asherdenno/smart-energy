import { fetchUsageSumPerYear } from '@/lib/db'; // Adjust the import path as necessary

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { account_id } = req.body;

    if (!account_id) {
        return res.status(400).json({ message: 'Account ID is required' });
    }

    try {
        const data = await fetchUsageSumPerYear();
        res.status(200).json({ message: 'Filtering by account ID is not yet implemented', data });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}