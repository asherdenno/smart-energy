import { fetchUsageSumPerYear } from '@/lib/db'; // Adjust the import path as necessary

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { city_id } = req.body;

    if (!city_id) {
        return res.status(400).json({ message: 'City ID is required' });
    }

    try {
        const data = await fetchUsageSumPerYear(city_id);
        console.log("This is the city_id from the request body: ", city_id);
        res.status(200).json(data);
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}