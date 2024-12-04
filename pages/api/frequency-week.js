import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const now = new Date();
    const chileTime = new Date(now.getTime() - 3 * 60 * 60 * 1000);

    const startOfWeek = new Date(chileTime);
    startOfWeek.setDate(chileTime.getDate() - chileTime.getDay() + 1); // Lunes
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 5); // Hasta viernes

    const reservationsWeek = await prisma.reservation.findMany({
      where: {
        createdAt: {
          gte: startOfWeek,
          lt: endOfWeek,
        },
      },
    });

    const weekData = reservationsWeek.reduce((acc, reservation) => {
      const day = new Date(reservation.createdAt).getDay();
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});

    const weekProcessed = [1, 2, 3, 4, 5].map(day => ({
      day: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'][day - 1], // Generar claves genéricas
      count: weekData[day] || 0,
    }));

    res.status(200).json(weekProcessed);
  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

