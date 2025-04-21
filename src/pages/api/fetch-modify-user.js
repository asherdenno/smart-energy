import { modifyUser } from '@/lib/db';

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { account_id, email, f_name, l_name, password } = req.body;

            await modifyUser(account_id, email, f_name, l_name, password);

            res.status(200).json({ message: 'User modified successfully' });
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Failed to modify user', details: error.message });
    }
}
