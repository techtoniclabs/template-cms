import { buildErr, buildRes } from "@/core/lib/response";
import { CreatePageSchema } from "@/cms/pages/models/schema";
import { createPage, getPages } from "@/cms/pages/services/PageService";
import { getToken } from "next-auth/jwt";
import { Prisma } from "@prisma/client";

export async function GET(req) {
  const token = await getToken({ req });
  if (!token) {
    return buildErr("ErrUnauthorized", 401);
  }

  const pages = await getPages();
  return buildRes(pages);
}

export async function POST(req) {
  const token = await getToken({ req });
  if (!token) {
    return buildErr("ErrUnauthorized", 401);
  }

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return buildErr("ErrValidation", 400);
  }

  const data = CreatePageSchema.safeParse(body);
  if (!data.success) {
    return buildErr("ErrValidation", 400, data.error);
  }

  let created;
  try {
    created = await createPage(data.data.type, data.data.title, data.data.slug);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return buildErr("ErrUnknown", 500);
    } else if (e.message === "ErrSlugForbidden") {
      return buildErr(e.message, 400, "slug cannot contain default keywords");
    } else if (e.message === "ErrSlugDuplicate") {
      return buildErr(e.message, 400, "slug already used by other page");
    } else if (e.message === "ErrPageDuplicateHomepage") {
      return buildErr(e.message, 400, "cannot be more than one homepage");
    }
  }

  return buildRes(created);
}
