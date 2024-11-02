import mysql from 'mysql2/promise';

export async function connectToDatabase() {
  return mysql.createConnection(process.env.DATABASE_URL);
}
