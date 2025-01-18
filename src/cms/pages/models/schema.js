const { z } = require("zod");

export const PageTypes = z.enum(["homepage", "about-us"]);

export const AttributeSchema = z.object({
  id: z.string(),
  type: z.string(),
  value: z.string(),
});

export const ComponentSchema = z.object({
  id: z.string(),
  type: z.string(),
  value: z.string(),
  index: z.number().nonnegative(),
  attributes: AttributeSchema.array(),
});

export const SectionSchema = z.object({
  id: z.string(),
  type: z.string(),
  index: z.number().nonnegative(),
  components: ComponentSchema.array(),
});

export const CreatePageSchema = z.object({
  type: PageTypes,
  title: z.string().min(3).max(20),
  slug: z.string().regex(/^\/[a-z0-9]+(?:-[a-z0-9]+)*$/),
});

export const UpdatePageContentSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(20),
  slug: z.string().regex(/^\/(?:[a-z0-9]+(?:-[a-z0-9]+))*$/),
  sections: SectionSchema.array(),
});
