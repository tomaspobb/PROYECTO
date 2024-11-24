import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const now = new Date();
      const currentMonth = now.getMonth() + 1; // Mes actual (1-12)
      const currentYear = now.getFullYear();

      // Consultar todas las reservas del mes actual
      const reservations = await prisma.reservation.findMany({
        where: {
          createdAt: {
            gte: new Date(`${currentYear}-${currentMonth}-01T00:00:00.000Z`), // Inicio del mes
            lt: new Date(`${currentYear}-${currentMonth + 1}-01T00:00:00.000Z`), // Inicio del siguiente mes
          },
        },
      });

      // Agrupar las reservas por día
      const dayCounts = {};
      reservations.forEach((reservation) => {
        const day = new Date(reservation.createdAt).getDate(); // Día del mes
        dayCounts[day] = (dayCounts[day] || 0) + 1; // Incrementar el conteo
      });

      // Preparar los datos para el gráfico
      const labels = Object.keys(dayCounts).map((day) => `Día ${day}`);
      const data = Object.values(dayCounts);

      res.status(200).json({ labels, data });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
