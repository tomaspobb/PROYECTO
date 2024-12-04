import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Obtener la fecha actual en la zona horaria de Chile
    const chileNow = new Date().toLocaleString('en-US', { timeZone: 'America/Santiago' });
    const now = new Date(chileNow);

    // Ajustar para el inicio del día y el inicio del siguiente día en la zona horaria de Chile
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(todayStart.getDate() + 1);

    // Obtener reservas del día actual
    const reservationsToday = await prisma.reservation.findMany({
      where: {
        createdAt: {
          gte: todayStart,
          lt: tomorrowStart,
        },
      },
    });

    // Procesar las reservas agrupándolas por hora
    const todayData = reservationsToday.reduce((acc, reservation) => {
      const hour = reservation.time; // Usar el campo "time" directamente
      acc[hour] = (acc[hour] || 0) + 1; // Sumar reservas por hora
      return acc;
    }, {});

    // Formatear los datos para enviarlos al frontend
    const todayProcessed = Object.keys(todayData)
      .sort((a, b) => a - b)
      .map(hour => ({
        hour: `${hour.padStart(2, '0')}:00`,
        count: todayData[hour],
      }));

    res.status(200).json(todayProcessed);
  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}
