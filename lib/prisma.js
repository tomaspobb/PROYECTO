// lib/prisma.js
// Importamos PrismaClient desde el paquete @prisma/client
import { PrismaClient } from '@prisma/client';

let prisma;

// Este patrón previene la creación de múltiples instancias de PrismaClient en modo desarrollo
if (process.env.NODE_ENV === 'production') {
  // En producción, creamos una única instancia de PrismaClient
  prisma = new PrismaClient();
} else {
  // En desarrollo, verificamos si ya existe una instancia global de PrismaClient
  // para evitar crear múltiples instancias debido a la recarga en caliente
  if (!global.prisma) {
    // Si no existe, la creamos y la asignamos a la variable global
    global.prisma = new PrismaClient();
  }
  // Usamos la instancia global para evitar múltiples conexiones
  prisma = global.prisma;
}

// Exportamos la instancia de PrismaClient para que esté disponible en toda la aplicación
export default prisma;
