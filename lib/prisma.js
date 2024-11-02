// lib/prisma.js
import { PrismaClient } from '@prisma/client';

let prisma;

// Este patrón previene la creación de múltiples instancias de PrismaClient en desarrollo
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
