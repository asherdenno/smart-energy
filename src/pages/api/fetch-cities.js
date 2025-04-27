import { fetchCities, fetchCity } from '@/lib/db';

export default async function handler(req, res) {
    try {
        console.log("payload:", {
            searchString: req.body.searchString,
            accountTypeId: req.body.accountTypeId,
            cityFilterId: req.body.cityFilterId,
            networkFilterId: req.body.networkFilterId
        });
        if (req.method === 'POST') {
            const { searchString, accountTypeId, cityFilterId, networkFilterId } = req.body;
            if (searchString === null || searchString === undefined) {
                return res.status(400).json({ message: 'Search string is required' });
            }
            if (accountTypeId === 1) {
                const cities = await fetchCities(searchString);
                res.status(200).json(cities);
            }
            else if (accountTypeId === 2) {
                const city = await fetchCity(cityFilterId)
                if (city) {
                    res.status(200).json(city);
                } else {
                    res.status(404).json({ message: 'City not found' });
                }
            }
            
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: error.message });
    }
}