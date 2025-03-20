import sql from 'mssql';

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  database: process.env.DB_SCHEMA,
  options: {
    encrypt: true, // Required for Azure
    trustServerCertificate: false // Set to true only for local dev with self-signed certs
  },
  port: 1433,
  connectionTimeout: 30000
};

const fetchAll = async () => {
    try {
        await sql.connect(config);
        const query = 'SELECT TOP (100) * FROM energy_data';
        const result = await sql.query(query);
        console.log("Data:", result.recordset);
        await sql.close();
        return result.recordset;
    } catch (error) {
        console.error("Database Error:", error); 
        throw new Error("Failed to fetch data: " + error.message);
    }
}

export default fetchAll;