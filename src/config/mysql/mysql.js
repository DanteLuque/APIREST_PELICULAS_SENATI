import mysql from 'mysql2/promise';
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Conexión exitosa");
    connection.release();
  } catch (err) {
    console.error("Error: ", err);
  }
}

testConnection();

export default pool;