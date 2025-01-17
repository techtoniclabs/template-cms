import { createId } from "@paralleldrive/cuid2";
import {
  SectionModel,
  ComponentModel,
  AttributeModel,
} from "@/cms/pages/models/BaseModel";

export class HeroModel extends SectionModel {
  constructor(props) {
    super(props);
  }

  static getTemplate(pageId, options = {}) {
    const id = createId();
    const heading = new ComponentModel(ComponentModel.getTemplate(id));
    const subheading = new ComponentModel(
      ComponentModel.getTemplate(id, { type: "subheading" })
    );

    const ctaId = createId();
    const ctaAttr = [
      new AttributeModel(
        AttributeModel.getTemplate(ctaId, { type: "href", value: "#" })
      ),
      new AttributeModel(
        AttributeModel.getTemplate(ctaId, { type: "variant", value: "outline" })
      ),
    ];
    const ctas = [...Array(2).keys()].map(
      () =>
        new ComponentModel(
          ComponentModel.getTemplate(id, {
            id: ctaId,
            type: "cta",
            attributes: ctaAttr,
          })
        )
    );

    const components = [heading, subheading, ...ctas];

    let template = {
      id,
      type: "hero",
      index: 0,
      components: components.map((component) => component.toObject()),
      pageId,
    };

    if (options) {
      template = { ...template, ...options };
    }

    return template;
  }
}
