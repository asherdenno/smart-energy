import { fetchAll } from '@/lib/db';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const data = await fetchAll();
      res.status(200).json(data);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message });
  }
}