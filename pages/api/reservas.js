// pages/api/reservas.js
// Importamos PrismaClient para interactuar con la base de datos
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Manejo de solicitudes GET para obtener todas las reservas
  if (req.method === 'GET') {
    try {
      // Obtener todas las reservas de la base de datos
      const reservations = await prisma.reservation.findMany();
      // Enviar las reservas como respuesta con un estado 200 (Éxito)
      res.status(200).json(reservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      // Enviar un error 500 (Error interno del servidor) si ocurre una excepción
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  // Manejo de solicitudes POST para crear una nueva reserva
  else if (req.method === 'POST') {
    // Obtenemos los datos de la mesa y la hora de la solicitud
    const { table, time } = req.body;
    try {
      // Crear una nueva reserva en la base de datos
      const newReservation = await prisma.reservation.create({
        data: { table, time },
      });
      // Enviar la nueva reserva como respuesta con un estado 201 (Creado)
      res.status(201).json(newReservation);
    } catch (error) {
      console.error("Error creating reservation:", error);
      // Enviar un error 500 (Error interno del servidor) si ocurre una excepción
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  // Si el método de solicitud no es GET ni POST, devolver un error 405 (Método no permitido)
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
