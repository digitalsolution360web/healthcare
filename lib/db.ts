import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || "193.203.184.6",
  user: process.env.DB_USER || "u313844719_doclistuser",
  password: process.env.DB_PASSWORD || "Abc55555d",
  database: process.env.DB_NAME || "u313844719_doclistdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
