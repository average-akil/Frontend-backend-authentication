import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL) {
  console.error("ERROR: DATABASE_URL environment variable not set");
  process.exit(1);
}

const prisma = new PrismaClient();

export { prisma };
