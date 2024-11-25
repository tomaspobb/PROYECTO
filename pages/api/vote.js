import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { dishId } = req.body;

    if (!dishId) {
      return res.status(400).json({ error: 'dishId is required' });
    }

    try {
      // Incrementa el voto del plato en la base de datos
      const updatedDish = await prisma.dish.update({
        where: { id: parseInt(dishId, 10) },
        data: { votes: { increment: 1 } },
      });

      return res.status(200).json({ message: 'Vote registered successfully', updatedDish });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
