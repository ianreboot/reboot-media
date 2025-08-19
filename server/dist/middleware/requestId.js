import { v4 as uuidv4 } from 'uuid';
export const validateRequestId = (req, res, next) => {
    req.requestId = uuidv4();
    res.setHeader('X-Request-ID', req.requestId);
    next();
};
//# sourceMappingURL=requestId.js.map