import { PageTypes } from "@/cms/pages/models/schema";
import { PageRepository } from "@/cms/pages/repositories/PageRepository";
import { createId } from "@paralleldrive/cuid2";

export async function checkSlug(pageId, slug) {
  const keywords = ["/api", "/cms", "/login"];
  for (const keyword of keywords) {
    if (slug.startsWith(keyword)) {
      throw new Error("ErrSlugForbidden");
    }
  }

  let found;
  try {
    found = await PageRepository.checkSlug(pageId, slug);
  } catch (e) {
    console.error(e);
    throw new Error("ErrUnknown");
  }

  if (found.length > 0) throw new Error("ErrSlugDuplicate");
}

export async function createPage(type, title, slug) {
  if (type === PageTypes.Enum.homepage) {
    throw new Error("ErrPageDuplicateHomepage");
  }

  const id = createId();

  await checkSlug(id, slug);
  return await PageRepository.create(type, title, slug);
}

export async function getPages() {
  try {
    const pages = await PageRepository.getAll();
    return pages;
  } catch (e) {
    console.error(e);
    return pages;
  }
}

export async function getPageById(id) {
  return PageRepository.getById(id);
}

export async function getPagesByType(type) {
  try {
    const pages = await PageRepository.getByType(type);
    return pages;
  } catch (e) {
    console.error(e);
    return pages;
  }
}

export async function updatePageContent(content) {
  let page;
  try {
    page = await getPageById(content.id);
  } catch (e) {
    throw new Error("ErrUnknown");
  }

  if (page.type === PageTypes.Enum.homepage) {
    content.slug = "/";
  }

  await checkSlug(content.id, content.slug);

  return PageRepository.updateContent(content);
}
