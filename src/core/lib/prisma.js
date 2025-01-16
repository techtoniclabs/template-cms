const { PrismaClient } = require("@prisma/client");

export const prisma = new PrismaClient();

export class BaseRepository {
  static db = prisma;
}
