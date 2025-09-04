export class AppError extends Error {
    statusCode;
    code;
    isOperational;
    constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
export const errorHandler = (err, req, res, next) => {
    const timestamp = new Date().toISOString();
    const requestId = req.requestId || 'unknown';
    console.error(`[${timestamp}] Error:`, {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        requestId,
    });
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
    res.status(500).json({
        success: false,
        error: {
            code: 'INTERNAL_ERROR',
            message: 'An unexpected error occurred',
            requestId,
        },
    });
};
