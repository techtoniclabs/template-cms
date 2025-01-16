const { z } = require("zod");

export const PageTypes = z.enum(["homepage", "about-us"]);

export const CreatePageSchema = z.object({
  type: PageTypes,
  title: z.string().min(3).max(20),
  slug: z.string().regex(/^\/[a-z0-9]+(?:-[a-z0-9]+)*$/),
});

export const UpdatePageSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(20),
  slug: z.string().regex(/^\/[a-z0-9]+(?:-[a-z0-9]+)*$/),
});
