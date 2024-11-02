import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function initializeDatabase() {
  try {
    await prisma.$connect();
    await prisma.$executeRaw`USE reservas_restaurante;`;
    console.log('Esquema "reservas_restaurante" seleccionado como predeterminado.');
  } catch (error) {
    console.error('Error al seleccionar el esquema predeterminado:', error);
  }
}

initializeDatabase();

export default prisma;
