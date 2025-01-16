import { PageTypes } from "@/pages/models/schema";
import { PageRepository } from "@/pages/repositories/PageRepository";
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
  try {
    const page = await PageRepository.getById(id);
    return page;
  } catch (e) {
    console.error(e);
    return page;
  }
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

export async function updatePage(id, title, slug) {
  let page;
  try {
    page = await getPageById(id);
  } catch (e) {
    throw new Error("ErrUnknown");
  }

  if (page.type === PageTypes.Enum.homepage) {
    slug = "/";
  }

  await checkSlug(id, slug);

  return PageRepository.update(id, title, slug);
}
