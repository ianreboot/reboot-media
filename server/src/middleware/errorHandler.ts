import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  public statusCode: number;
  public code: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, code: string = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

interface RequestWithId extends Request {
  requestId?: string;
}

export const errorHandler = (
  err: AppError | Error,
  req: RequestWithId,
  res: Response,
  next: NextFunction
): void => {
  const timestamp = new Date().toISOString();
  const requestId = req.requestId || 'unknown';

  // Log error details for debugging (sanitized)
  console.error(`[${timestamp}] Error:`, {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    requestId,
  });

  // Handle operational errors (safe to send to client)
  if (err instanceof AppError && err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        requestId,
      },
    });
    return;
  }

  // Handle validation errors from Joi
  if (err.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input data',
        requestId,
      },
    });
    return;
  }

  // Handle unexpected errors (don't leak details)
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
      requestId,
    },
  });
};