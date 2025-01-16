import { z } from "zod";

export const ErrorCode = {
  // general
  ErrNotFound: "data not found",
  ErrUnauthorized: "sign in to continue",
  ErrUnknown: "unknown error occurred",
  ErrValidation: "error in parsing input data",
  ErrForbidden: "request forbidden",
  ErrConflict: "request conflict",
  ErrTooManyRequest: "too many request",
};

export function buildErr(code, status, message) {
  const err = { error: { code, message: ErrorCode[code] } };
  if (message) {
    if (message instanceof z.ZodError) {
      err.error.data = message.flatten().fieldErrors;
    } else {
      err.error.data = message;
    }
  }

  return Response.json(err, { status: status });
}

export function buildRes(data) {
  return Response.json({ data });
}
