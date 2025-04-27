import { fetchUnassignedNetworks } from '@/lib/db';

export default async function handler(req, res) {

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const unassignedNetworks = await fetchUnassignedNetworks();
        res.status(200).json(unassignedNetworks);
    }
    catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: error.message });
    }
}