import { deleteUser } from '@/lib/db';

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { account_id } = req.body;

            await deleteUser(account_id);

            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('API  Error:', error);
        res.status(500).json({ error: 'Failed to add user' });
    }
}