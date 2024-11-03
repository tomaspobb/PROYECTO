// pages/api/register.js
// Importamos bcrypt para cifrar la contraseña y prisma para interactuar con la base de datos
import bcrypt from 'bcryptjs';
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  // Verificamos que el método de la solicitud sea POST
  if (req.method === 'POST') {
    // Obtenemos el nombre de usuario, contraseña y correo electrónico del cuerpo de la solicitud
    const { username, password, email } = req.body;

    // Verificamos si el usuario ya existe en la base de datos
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    // Si el usuario ya existe, devolvemos un error 400 (Solicitud incorrecta)
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Cifrado de la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creamos el usuario en la base de datos con la contraseña cifrada
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Devolvemos una respuesta 201 (Creado) con un mensaje de éxito
    res.status(201).json({ message: 'User registered successfully' });
  } else {
    // Si el método no es POST, devolvemos un error 405 (Método no permitido)
    res.status(405).json({ message: 'Method not allowed' });
  }
}
