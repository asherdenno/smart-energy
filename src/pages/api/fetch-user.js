import { fetchUser } from '@/lib/db_users';

export default async function handler(req, res) {
    console.log('Made it to here **1')
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    console.log('Made it to here **2')
    const { userName, password } = req.body;
    console.log('The user name is: ' + userName)
    console.log('Password is: ' + password)
    console.log('Made it to here **3')
    

    if (!userName) {
        return res.status(400).json({ message : 'Username is required' });
    }

    try {
        const data = await fetchUser(userName, password);
        res.status(200).json( data );
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ message: 'Internal Server Error. Check logs.' });
    }
}
