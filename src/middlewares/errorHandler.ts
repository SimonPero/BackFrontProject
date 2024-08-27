import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError, ErrorLevels } from "../utils/customError/errors";
import logger from "../logger/logger";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  let statusCode = 500;
  let level = ErrorLevels.CRITICAL;
  let errorDetail: unknown = null;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    level = err.level;
    errorDetail = err.errorDetail;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    level = ErrorLevels.WARNING;
    errorDetail = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  }

  logger.log({
    level,
    message: err.message,
    metadata: {
      statusCode,
      stack: err.stack,
      errorDetail,
      path: req.path,
      method: req.method,
      ip: req.ip,
    },
  });

  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { detail: errorDetail }),
  });
}
