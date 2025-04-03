import { fetchAllUserFilterIds } from '@/lib/db';

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const filter = await fetchAllUserFilterIds();
            res.status(200).json(filter);
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: error.message });
    }
}