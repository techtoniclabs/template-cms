import { SectionObject } from "./BaseModel";

export class HeroObject extends SectionObject {
  template = {
    heading: {
      value: "",
    },
    subheading: {
      value: "",
    },
    cta: [
      { value: "", href: "", variant: "" },
      { value: "", href: "", variant: "" },
    ],
  };

  constructor(props) {
    super(props);
    this.template.heading = this.getComponents("heading")[0];
    this.template.subheading = this.getComponents("subheading")[0];
    this.template.cta = this.getComponents("cta");
    for (const btn of this.template.cta) {
      btn.href = btn.getAttributes("href");
      btn.variant = btn.getAttributes("variant");
    }
  }
}
