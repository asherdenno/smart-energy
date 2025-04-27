import { fetchUnassignedCities, searchUnassignedCities } from '@/lib/db';

export default async function handler(req, res) {

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { searchString = "", searchInitiated = false, nextListInitiated = false, listLength = 1, listSize = 50 } = req.query;

    if (nextListInitiated) {
        try {
            const unassignedCities = await fetchUnassignedCities(Number(listLength), Number(listSize));
            res.status(200).json(unassignedCities);
        }
        catch (error) {
            console.error("API Error:", error);
            res.status(500).json({ error: error.message });
        }
    }
    else if (searchString !== null || searchInitiated) {
        try {
            const unassignedCities = await searchUnassignedCities(searchString, Number(listLength), Number(listSize));
            res.status(200).json(unassignedCities);
        }
        catch (error) {
            console.error("API Error:", error);
            res.status(500).json({ error: error.message });
        }
    }
    else {
        res.status(400).json({ message: 'Search string is required' });
    }
}