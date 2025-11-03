import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof z.ZodError) {
    return res.status(400).json({ message: "Validation error", issues: err.issues });
  }
  // eslint-disable-next-line no-console
  console.error(err);
  if (process.env.DEBUG_ERRORS === "true") {
    const e = err as any;
    return res.status(500).json({
      message: e?.message || "Internal Server Error",
      code: e?.code,
      meta: e?.meta,
      stack: e?.stack,
    });
  }
  res.status(500).json({ message: "Internal Server Error" });
}
