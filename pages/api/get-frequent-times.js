import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Obtener la hora actual en la zona horaria de Chile
      const chileTime = new Date().toLocaleString('en-US', { timeZone: 'America/Santiago' });
      const now = new Date(chileTime);
      const currentDay = now.getDate();
      const currentMonth = now.getMonth() + 1; // Mes actual (1-12)
      const currentYear = now.getFullYear();

      // Obtener todas las reservas del mes actual
      const reservations = await prisma.reservation.findMany({
        where: {
          createdAt: {
            gte: new Date(`${currentYear}-${currentMonth}-01T00:00:00.000Z`),
            lt: new Date(`${currentYear}-${currentMonth + 1}-01T00:00:00.000Z`),
          },
        },
      });

      // Agrupar las reservas por día
      const dayCounts = {};
      reservations.forEach((reservation) => {
        const day = new Date(reservation.createdAt).getDate();
        dayCounts[day] = (dayCounts[day] || 0) + 1;
      });

      // Obtener las reservas para el día actual
      const reservationsToday = reservations.filter(
        (reservation) => new Date(reservation.createdAt).getDate() === currentDay
      );

      const hourCountsToday = {};
      reservationsToday.forEach((reservation) => {
        const hour = parseInt(reservation.time.split(':')[0]); // Hora de la columna 'time'
        hourCountsToday[hour] = (hourCountsToday[hour] || 0) + 1;
      });

      // Formatear respuesta
      const labelsDays = Object.keys(dayCounts).map((day) => `Día ${day}`);
      const dataDays = Object.values(dayCounts);
      const labelsHoursToday = Object.keys(hourCountsToday).map((hour) => `${hour}:00`);
      const dataHoursToday = Object.values(hourCountsToday);

      res.status(200).json({
        labelsDays,
        dataDays,
        labelsHoursToday,
        dataHoursToday,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

