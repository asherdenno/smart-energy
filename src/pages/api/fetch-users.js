import { fetchAllUsersInPages } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { page = 1, pageSize = 20 } = req.query;

  try {
    const { users, totalPages } = await fetchAllUsersInPages(Number(page), Number(pageSize));
    res.status(200).json({ users, totalPages });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}