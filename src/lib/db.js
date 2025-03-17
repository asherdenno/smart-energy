import mysql from 'mysql2/promise';

// Create a connection pool instead of using top-level await
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 30000,
  ssl: {
    rejectUnauthorized: true
  }
});

const fetchAll = async () => {
    try {
        const query = "SELECT * FROM account"; 
        const [rows] = await pool.execute(query);
        return rows;
    } catch (error) {
        console.error("Database Error:", error); 
        throw new Error("Failed to fetch data: " + error.message);
    }
}

export default fetchAll;