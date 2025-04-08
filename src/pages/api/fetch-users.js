import { fetchAllUsersInPages } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { page = 1, pageSize = 20 } = req.query;

    try {
      const users = await fetchAllUsersInPages(Number(page), Number(pageSize));
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}