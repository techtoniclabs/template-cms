import { BaseRepository } from "@/core/lib/prisma";

export class PageRepository extends BaseRepository {
  static async checkSlug(id, slug) {
    return this.db.page.findMany({
      select: { id: true },
      where: {
        AND: [{ id: { not: id } }, { slug }],
      },
    });
  }

  static async create(type, title, slug) {
    return this.db.page.create({
      data: {
        type,
        title,
        slug,
      },
    });
  }

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

  static async update(id, title, slug) {
    return this.db.page.update({
      where: {
        id,
      },
      data: {
        title,
        slug,
      },
    });
  }
}
