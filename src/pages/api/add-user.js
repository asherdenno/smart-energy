import sql from 'mssql';

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_SCHEMA,
    options: {
        encrypt: true, // Required for Azure
        trustServerCertificate: false, // Set to true only for local dev with self-signed certs
    },
    port: 1433, // Ensure this is defined
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{10,}$/.test(password);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, f_name, l_name, username, password, account_type_id, network_filter_id, city_filter_id } = req.body;

        try {
            // Validate email and password before inserting into the database
            if (!validateEmail(email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }
            if (!validatePassword(password)) {
                return res.status(400).json({ error: 'Password must be at least 10 characters, include 1 uppercase, 1 lowercase, and 1 special character' });
            }

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
            request.input('NetworkFilterId', sql.Int, network_filter_id || null); // Ensure null is passed if undefined
            request.input('CityFilterId', sql.Int, city_filter_id || null); // Ensure null is passed if undefined

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