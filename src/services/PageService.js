import { buildRes } from "@/lib/response";
import { PageRepository } from "@/repositories/PageRepository";

export async function getPages() {
  try {
    const pages = await PageRepository.getAll();
    return buildRes(pages);
  } catch (e) {
    console.error(e);
    return buildRes(pages);
  }
}

export async function getPageById(id) {
  try {
    const page = await PageRepository.getById(id);
    return buildRes(page);
  } catch (e) {
    console.error(e);
    return buildRes(pages);
  }
}

export async function getPagesByType(type) {
  try {
    const pages = await PageRepository.getByType(type);
    return buildRes(pages);
  } catch (e) {
    console.error(e);
    return buildRes(pages);
  }
}
