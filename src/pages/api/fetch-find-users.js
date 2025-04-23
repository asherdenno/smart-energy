import { findUsers } from "@/lib/db";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { searchTerm, page, pageSize } = req.query;
    try {
        const { users, totalPages } = await findUsers(searchTerm || "", Number(page) || 1, Number(pageSize) || 10);
        res.status(200).json({ users, totalPages });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Failed to fetch users", details: error.message });
    }
}