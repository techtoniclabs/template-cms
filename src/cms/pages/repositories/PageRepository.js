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
      include: {
        sections: {
          include: { components: { include: { attributes: true } } },
        },
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

  static async updateContent(content) {
    return this.db.$transaction(async (tx) => {
      const updated = await tx.page.update({
        where: {
          id: content.id,
        },
        data: {
          title: content.title,
          slug: content.slug,
        },
      });

      for (const section of content.sections) {
        await tx.section.update({
          where: {
            id: section.id,
          },
          data: {
            type: section.type,
            index: section.index,
            tags: section.tags,
          },
        });

        for (const component of section.components) {
          await tx.component.update({
            where: {
              id: component.id,
            },
            data: {
              type: component.type,
              index: component.index,
              value: component.value,
            },
          });

          for (const attribute of component.attributes) {
            await tx.attribute.update({
              where: {
                id: attribute.id,
              },
              data: {
                type: attribute.type,
                value: attribute.value,
              },
            });
          }
        }
      }

      return updated;
    });
  }
}
