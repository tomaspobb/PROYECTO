import prisma from '../../lib/prisma'; // Asegúrate de que Prisma esté configurado

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const dishes = await prisma.dish.findMany(); // Asume que tienes una tabla `dish` en tu base de datos
      res.status(200).json(dishes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching dishes' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
