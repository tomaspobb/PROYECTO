// pages/api/reservas.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Obtener todas las reservas
      const reservations = await prisma.reservation.findMany();
      res.status(200).json(reservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const { table, time } = req.body;
    try {
      // Crear una nueva reserva
      const newReservation = await prisma.reservation.create({
        data: { table, time },
      });
      res.status(201).json(newReservation);
    } catch (error) {
      console.error("Error creating reservation:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const response = await axios.get('http://localhost:3000/api/reservas');
}
