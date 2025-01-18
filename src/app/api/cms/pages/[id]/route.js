import { buildErr, buildRes } from "@/core/lib/response";
import { UpdatePageContentSchema } from "@/cms/pages/models/schema";
import {
  getPageById,
  updatePageContent,
} from "@/cms/pages/services/PageService";
import { getToken } from "next-auth/jwt";
import { revalidatePath } from "next/cache";

export async function GET(req, { params }) {
  const id = (await params).id;

  const token = await getToken({ req });
  if (!token) {
    return buildErr("ErrUnauthorized", 401);
  }

  let result;
  try {
    result = await getPageById(id);
  } catch (e) {
    console.error(e);
    return buildErr("ErrUnknown", 500);
  }

  return buildRes(result);
}

export async function PATCH(req, res) {
  const id = (await res.params).id;

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

  body.id = id;

  const data = UpdatePageContentSchema.safeParse(body);
  if (!data.success) {
    return buildErr("ErrValidation", 400, data.error);
  }

  let updated;
  try {
    updated = await updatePageContent(data.data);
    revalidatePath(updated.slug);
  } catch (e) {
    console.error(e);
    return buildErr("ErrUnknown", 500);
  }

  return buildRes(updated);
}
