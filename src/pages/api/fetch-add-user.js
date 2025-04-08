import sql from 'mssql';
import { config } from '@/lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, f_name, l_name, username, password, account_type_id, network_filter_id, city_filter_id } = req.body;

        // Validate required fields
        if (!email || !f_name || !l_name || !username || !password || !account_type_id) {
            return res.status(400).json({ error: 'All required fields must be filled' });
        }

        try {
            await sql.connect(config);
            const query = `
                INSERT INTO dbo.account (email, f_name, l_name, username, password, account_type_id, network_filter_id, city_filter_id)
                VALUES (@Email, @FName, @LName, @Username, @Password, @AccountTypeId, @NetworkFilterId, @CityFilterId);
            `;
            const request = new sql.Request();
            request.input('Email', sql.NVarChar, email);
            request.input('FName', sql.NVarChar, f_name);
            request.input('LName', sql.NVarChar, l_name);
            request.input('Username', sql.NVarChar, username);
            request.input('Password', sql.NVarChar, password);
            request.input('AccountTypeId', sql.Int, account_type_id);
            request.input('NetworkFilterId', sql.Int, network_filter_id || null); 
            request.input('CityFilterId', sql.Int, city_filter_id || null); 

            await request.query(query);
            res.status(200).json({ message: 'User added successfully' });
        } catch (error) {
            console.error('Database Error:', error);
            res.status(500).json({ error: 'Failed to add user' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}