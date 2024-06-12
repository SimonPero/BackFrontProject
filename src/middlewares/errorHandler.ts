import { Request, Response, NextFunction } from 'express';
import winston from 'winston';
import { ZodError } from 'zod';

// Configuración de winston con niveles de severidad personalizados
const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.Console()
  ],
});

// Definición de niveles de severidad como enum
enum ErrorLevels {
  CRITICAL = 'error',
  WARNING = 'warn',
  INFO = 'info'
}

// Clase personalizada de error para manejar diferentes niveles
class AppError extends Error {
  statusCode: number;
  level: ErrorLevels;
  errorDetail: unknown;

  constructor(message: string, statusCode: number, errorDetail: unknown, level: ErrorLevels = ErrorLevels.CRITICAL) {
    super(message);
    this.statusCode = statusCode;
    this.errorDetail = errorDetail;
    this.level = level;
  }
}

export default function errorHandler(err: AppError, _req: Request, res: Response, _next: NextFunction) {
  if(err instanceof ZodError){
    const errors = err.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));
    return res.status(400).json({ errors });
  }
  // Definir el nivel de severidad por defecto si no está presente
  const level = err.level || ErrorLevels.CRITICAL;

  // Registrar el error con winston
  logger.log({
    level: level,
    message: err.message,
    metadata: {
      statusCode: err.statusCode,
      stack: err.stack,
      errorDetail: err.errorDetail
    }
  });

  // Enviar la respuesta de error al cliente
  res.status(err.statusCode || 500).json({ error: err.message || 'Internal Server Error' });
}

// Exportar la clase personalizada de error y el enum de niveles de error
export { AppError, ErrorLevels };
