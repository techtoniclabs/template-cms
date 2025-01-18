import { BaseRepository } from "@/core/lib/prisma";

export class AttributeRepository extends BaseRepository {
  static async create(attribute) {
    return this.db.attribute.create({
      data: {
        id: attribute.id,
        type: attribute.type,
        value: attribute.value,
        component: {
          connect: {
            id: attribute.componentId,
          },
        },
      },
    });
  }

  static async update(attribute) {
    return this.db.attribute.update({
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
