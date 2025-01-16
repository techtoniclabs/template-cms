import { BaseRepository } from "@/lib/prisma";

export class PageRepository extends BaseRepository {
  static async getAll() {
    return this.db.page.findMany();
  }

  static async getById(id) {
    return this.db.page.findUniqueOrThrow({
      where: { id },
      select: {
        components: true,
      },
    });
  }

  static async getByType(type) {
    return this.db.page.findMany({
      where: { type },
      include: {
        sections: {
          include: { components: { include: { attributes: true } } },
        },
      },
    });
  }
}
