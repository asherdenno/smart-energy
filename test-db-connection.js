import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

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

async function testConnection() {
  try {
    await sql.connect(config);
    console.log('✅ Connection to Azure SQL Server successful!');
    const result = await sql.query('SELECT TOP (100) * FROM list_data');
    console.log(result.recordset);
    await sql.close();
  } catch (err) {
    console.error('❌ Connection failed:', err);
  }
}

testConnection();