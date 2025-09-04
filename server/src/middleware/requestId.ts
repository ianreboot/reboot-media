import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

interface RequestWithId extends Request {
  requestId: string;
}

export const validateRequestId = (
  req: RequestWithId,
  res: Response,
  next: NextFunction
): void => {
  // Generate unique request ID for tracking
  req.requestId = uuidv4();
  
  // Add request ID to response headers for debugging
  res.setHeader('X-Request-ID', req.requestId);
  
  next();
};