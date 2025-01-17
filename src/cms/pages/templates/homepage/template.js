import { createId } from "@paralleldrive/cuid2";
import { PageModel } from "@/cms/pages/models/BaseModel";
import { HeroModel } from "@/cms/pages/templates/homepage/hero/HeroModel";

export class HomepageModel extends PageModel {
  constructor(props) {
    super(props);
  }

  static getTemplate() {
    const pageId = createId();

    const hero = new HeroModel(HeroModel.getTemplate(pageId));

    const sections = [hero];

    let template = {
      id: pageId,
      type: "homepage",
      title: "Home",
      slug: "/",
      sections: sections.map((section) => section.toObject()),
    };

    return template;
  }
}
