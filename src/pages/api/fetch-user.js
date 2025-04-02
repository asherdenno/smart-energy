import { fetchUser } from '@/lib/db_users';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    const { userName, password } = req.body;  

    if (!userName || !password) {
        return res.status(400).json({ message : 'Username and password are required' });
    }

    try {
        const data = await fetchUser(userName, password);
        res.status(200).json( data );
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ message: 'Internal Server Error. Check logs.' });
    }
}
