// Importamos mysql2/promise, una versión de la biblioteca MySQL que soporta promesas
import mysql from 'mysql2/promise';

// Definimos una función asincrónica para establecer la conexión con la base de datos
export async function connectToDatabase() {
  // Creamos una conexión usando la URL de la base de datos, almacenada en una variable de entorno
  return mysql.createConnection(process.env.DATABASE_URL);
}
