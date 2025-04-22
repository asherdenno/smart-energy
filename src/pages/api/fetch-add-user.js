import { insertNewUser } from '@/lib/db';

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { email, f_name, l_name, password, account_type_id, network_filter_id, city_filter_id } = req.body;

            console.log('Request payload:', req.body); // Log the incoming payload

            await insertNewUser(email, f_name, l_name, password, account_type_id, network_filter_id, city_filter_id);

            res.status(200).json({ message: 'User added successfully' });
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Failed to add user', details: error.message  });
    }
}