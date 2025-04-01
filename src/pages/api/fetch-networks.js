import { fetchNetworks } from '@/lib/db';

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const cities = await fetchNetworks();
            res.status(200).json(cities);
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: error.message });
    }
}