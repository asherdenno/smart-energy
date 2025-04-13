import { insertNewUser } from '@/lib/db';

export default async function handler(req, res) {

    console.log("running fetch add user")
    try {
        if (req.method === 'POST') {
            const { email, f_name, l_name, username, password, account_type_id, network_filter_id, city_filter_id } = req.body;

            // Call the insertNewUser function
            await insertNewUser(email, f_name, l_name, username, password, account_type_id, network_filter_id, city_filter_id);

            res.status(200).json({ message: 'User added successfully' });
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Failed to add user' });
    }
}