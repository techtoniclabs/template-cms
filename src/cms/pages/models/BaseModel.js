import { createId } from "@paralleldrive/cuid2";
import { sortItems } from "@/core/lib/helper";

export class AttributeModel {
  #props = {};

  constructor(props) {
    this.parse(props);
  }

  parse(props) {
    this.#props.id = props.id;
    this.#props.type = props.type;
    this.#props.value = props.value;
  }

  static getTemplate(componentId, options = {}) {
    let template = {
      id: createId(),
      type: "href",
      value: "#",
      componentId,
    };

    if (options) {
      template = { ...template, ...options };
    }

    return template;
  }

  toObject() {
    const obj = {
      id: this.id,
      type: this.type,
      value: this.value,
    };

    return obj;
  }

  get id() {
    return this.#props.id;
  }

  get type() {
    return this.#props.type;
  }

  get value() {
    return this.#props.value;
  }

  set id(id) {
    this.#props.id = id;
  }

  set type(type) {
    this.#props.type = type;
  }

  set value(value) {
    this.#props.value = value;
  }
}

export class ComponentModel {
  #props = {};

  constructor(props) {
    this.parse(props);
  }

  parse(props) {
    this.#props.id = props.id;
    this.#props.type = props.type;
    this.#props.index = props.index;
    if ("value" in props) {
      this.#props.value = props.value;
    } else {
      this.#props.value = "";
    }
    this.#props.attributes = [];
    if ("attributes" in props) {
      for (const attribute of props.attributes) {
        this.#props.attributes.push(new AttributeModel(attribute));
      }
    }
  }

  static getTemplate(sectionId, options = {}) {
    const id = createId();
    let attributes = [new AttributeModel(AttributeModel.getTemplate(id))];

    let template = {
      id,
      type: "heading",
      index: 0,
      value: "lorem ipsum",
      sectionId,
      attributes,
    };

    if (options) {
      template = { ...template, ...options };
    }

    return template;
  }

  getAttributes(type) {
    for (const attribute of this.#props.attributes) {
      if (attribute.type === type) {
        return attribute.value;
      }
    }
  }

  setAttributes(type, val) {
    for (const attribute of this.#props.attributes) {
      if (attribute.type === type) {
        attribute.value = val;
      }
    }
  }

  toObject() {
    const obj = {
      id: this.id,
      type: this.type,
      index: this.index,
      value: this.value,
      attributes: this.attributes.map((attribute) => attribute.toObject()),
    };

    return obj;
  }

  get id() {
    return this.#props.id;
  }

  get type() {
    return this.#props.type;
  }

  get index() {
    return this.#props.index;
  }

  get value() {
    return this.#props.value;
  }

  get attributes() {
    return this.#props.attributes;
  }

  set id(id) {
    this.#props.id = id;
  }

  set type(type) {
    this.#props.type = type;
  }

  set index(index) {
    this.#props.index = index;
  }

  set value(value) {
    this.#props.value = value;
  }

  set attributes(attributes) {
    this.#props.attributes = attributes;
  }
}

export class SectionModel {
  #props = {};

  constructor(props) {
    this.parse(props);
  }

  parse(props) {
    this.#props.id = props.id;
    this.#props.type = props.type;
    this.#props.index = props.index;
    if ("tags" in props) {
      this.#props.tags = props.tags;
    } else {
      this.#props.tags = "";
    }
    this.#props.components = [];
    if ("components" in props) {
      props.components = sortItems(props.components);
      for (const component of props.components) {
        this.#props.components.push(new ComponentModel(component));
      }
    }
  }

  static getTemplate(pageId, options = {}) {
    const id = createId();
    let components = [new ComponentModel(ComponentModel.getTemplate(id))];

    let template = {
      id,
      type: "hero",
      index: 0,
      pageId,
      components,
    };

    if (options) {
      template = { ...template, ...options };
    }

    return template;
  }

  getComponent(id) {
    for (const component of this.#props.components) {
      if (component.id === id) {
        return component;
      }
    }
  }

  getComponents(type) {
    let result = [];
    for (const component of this.#props.components) {
      if (component.type === type) {
        result.push(component);
      }
    }
    return result;
  }

  setComponent(id, val) {
    for (const component of this.#props.components) {
      if (component.id === id) {
        component.value = val;
      }
    }
  }

  setComponents(type, val) {
    for (const component of this.#props.components) {
      if (component.type === type) {
        component.value = val;
      }
    }
  }

  toObject() {
    const obj = {
      id: this.id,
      type: this.type,
      index: this.index,
      tags: this.tags,
      components: this.components.map((component) => component.toObject()),
    };

    return obj;
  }

  get id() {
    return this.#props.id;
  }

  get type() {
    return this.#props.type;
  }

  get index() {
    return this.#props.index;
  }

  get tags() {
    return this.#props.tags;
  }

  get components() {
    return this.#props.components;
  }

  set id(id) {
    this.#props.id = id;
  }

  set type(type) {
    this.#props.type = type;
  }

  set index(index) {
    this.#props.index = index;
  }

  set tags(tags) {
    this.#props.tags = tags;
  }

  set components(components) {
    this.#props.components = components;
  }
}

export class PageModel {
  props = {};

  constructor(props) {
    this.parse(props);
  }

  parse(props) {
    this.props.id = props.id;
    this.props.type = props.type;
    this.props.title = props.title;
    if ("slug" in props) {
      this.props.slug = props.slug;
    } else {
      this.props.slug = "";
    }
    this.props.sections = [];
    if ("sections" in props) {
      props.sections = sortItems(props.sections);
      for (const section of props.sections) {
        this.props.components.push(new SectionModel(section));
      }
    }
  }

  static getTemplate(options = {}) {
    const id = createId();
    let sections = [new SectionModel(SectionModel.getTemplate(id))];

    let template = {
      id,
      type: "homepage",
      title: "home",
      slug: "/",
      sections,
    };

    if (options) {
      template = { ...template, ...options };
    }

    return template;
  }

  getSection(id) {
    for (const section of this.props.sections) {
      if (section.id === id) {
        return section;
      }
    }
  }

  getSections(type) {
    let result = [];
    for (const section of this.props.sections) {
      if (section.type === type) {
        result.push(section);
      }
    }
    return result;
  }

  setSection(id, val) {
    for (const section of this.props.sections) {
      if (section.id === id) {
        section.value = val;
      }
    }
  }

  setSections(type, val) {
    for (const section of this.props.sections) {
      if (section.type === type) {
        section.value = val;
      }
    }
  }

  toObject() {
    const obj = {
      id: this.id,
      type: this.type,
      title: this.title,
      slug: this.slug,
      sections: this.sections.map((section) => section.toObject()),
    };

    return obj;
  }
}
