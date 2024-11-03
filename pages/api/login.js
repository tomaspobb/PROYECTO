// pages/api/login.js
// Importamos prisma para interactuar con la base de datos, bcrypt para manejar el cifrado de contraseñas y jwt para generar tokens de autenticación
import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  // Verificamos que el método de la solicitud sea POST, si no, devolvemos un error 405 (Método no permitido)
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  // Obtenemos el nombre de usuario y la contraseña del cuerpo de la solicitud
  const { username, password } = req.body;

  try {
    // Busca al usuario en la base de datos utilizando el nombre de usuario proporcionado
    const user = await prisma.user.findUnique({
      where: { username },
    });

    // Si el usuario no existe, devolvemos un error 401 (Credenciales incorrectas)
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Comparamos la contraseña proporcionada con la contraseña almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Si la contraseña es incorrecta, devolvemos un error 401 (Credenciales incorrectas)
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Si las credenciales son correctas, generamos un token JWT con el ID y nombre de usuario
    const token = jwt.sign(
      { userId: user.id, username: user.username }, // Información codificada en el token
      process.env.JWT_SECRET, // Clave secreta para firmar el token
      { expiresIn: '1h' } // Duración de validez del token
    );

    // Devolvemos el token en la respuesta con un código 200 (Éxito)
    res.status(200).json({ token });
  } catch (error) {
    console.error(error); // Registramos el error en la consola
    // Devolvemos un error 500 (Error interno del servidor) en caso de excepción
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}
