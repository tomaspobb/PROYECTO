import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const now = new Date();
      const currentMonth = now.getMonth() + 1; // Mes actual
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

      // Determinar el día más frecuentado
      const mostFrequentedDay = Object.keys(dayCounts).reduce(
        (a, b) => (dayCounts[a] > dayCounts[b] ? a : b),
        null
      );

      // Obtener la distribución por hora del día más frecuentado (opcional)
      const reservationsOnMostFrequentedDay = reservations.filter(
        (reservation) => new Date(reservation.createdAt).getDate() === parseInt(mostFrequentedDay)
      );

      const hourCounts = {};
      reservationsOnMostFrequentedDay.forEach((reservation) => {
        const hour = parseInt(reservation.time.split(':')[0]); // Hora de la columna 'time'
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
      });

      // Formatear respuesta
      const labelsDays = Object.keys(dayCounts).map((day) => `Día ${day}`);
      const dataDays = Object.values(dayCounts);
      const labelsHours = Object.keys(hourCounts).map((hour) => `${hour}:00`);
      const dataHours = Object.values(hourCounts);

      res.status(200).json({
        mostFrequentedDay: `Día ${mostFrequentedDay}`,
        mostFrequentedDayCount: dayCounts[mostFrequentedDay],
        labelsDays,
        dataDays,
        labelsHours,
        dataHours,
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

