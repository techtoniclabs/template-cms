import { buildErr } from "@/lib/response";
import { getToken } from "next-auth/jwt";

export async function POST(req, res) {
  const token = await getToken(req);
  if (!token) {
    return buildErr("ErrUnauthorized", 401);
  }

  return Response.json({ data: "success" });
}
