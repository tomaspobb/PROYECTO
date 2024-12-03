import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const chileTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Santiago",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date());

      const [month, day, year] = chileTime.split('/');
      const currentMonth = parseInt(month);
      const currentDay = parseInt(day);
      const currentYear = parseInt(year);

      const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
      const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;

      const reservations = await prisma.reservation.findMany({
        where: {
          createdAt: {
            gte: new Date(`${currentYear}-${currentMonth}-01T00:00:00.000Z`),
            lt: new Date(`${nextYear}-${nextMonth}-01T00:00:00.000Z`),
          },
        },
      });

      const dayCounts = {};
      reservations.forEach((reservation) => {
        const day = new Date(reservation.createdAt).getDate();
        dayCounts[day] = (dayCounts[day] || 0) + 1;
      });

      const reservationsToday = reservations.filter(
        (reservation) => new Date(reservation.createdAt).getDate() === currentDay
      );

      const hourCountsToday = {};
      reservationsToday.forEach((reservation) => {
        const hour = parseInt(reservation.time.split(':')[0]);
        hourCountsToday[hour] = (hourCountsToday[hour] || 0) + 1;
      });

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
