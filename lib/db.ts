// lib/db.ts
import { PrismaClient } from '@prisma/client';

// Create a Prisma client instance with MongoDB specific settings
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  // MongoDB specific settings
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Ensure we only create one instance in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Add MongoDB specific health check
export async function checkDatabaseConnection() {
  try {
    // For MongoDB, we can use a count query to verify connection
    await prisma.user.count();
    console.log('✅ MongoDB connection successful');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    return false;
  }
}