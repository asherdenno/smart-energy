import { deleteUser } from '@/lib/db';

export default async function handler(req, res) {

    console.log("running fetch add user")
    try {
        if (req.method === 'POST') {
            const { account_id } = req.body;

            await deleteUser(account_id);

            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Failed to add user' });
    }
}