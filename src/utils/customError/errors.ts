export enum ErrorLevels {
  CRITICAL = "error",
  WARNING = "warn",
  INFO = "info",
}

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public errorDetail: unknown,
    public level: ErrorLevels = ErrorLevels.CRITICAL
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, errorDetail: unknown) {
    super(message, 400, errorDetail, ErrorLevels.WARNING);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404, null, ErrorLevels.INFO);
  }
}
