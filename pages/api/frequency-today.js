import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const now = new Date();
    const chileTime = new Date(now.getTime() - 3 * 60 * 60 * 1000);

    const startOfDay = new Date(chileTime.getFullYear(), chileTime.getMonth(), chileTime.getDate());
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(startOfDay.getDate() + 1);

    const reservationsToday = await prisma.reservation.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });

    const todayData = reservationsToday.reduce((acc, reservation) => {
      const hour = reservation.time;
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {});

    const todayProcessed = Object.keys(todayData)
      .sort()
      .map(hour => ({
        hour: `${hour}:00`,
        count: todayData[hour],
      }));

    res.status(200).json(todayProcessed);
  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}
