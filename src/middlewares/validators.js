import { HttpError } from '../errors/HttpError.js';

export function requireBodyFields(fields) {
  return (req, _res, next) => {
    const missing = fields.filter((f) => req.body?.[f] === undefined);
    if (missing.length) {
      return next(new HttpError(400, `Missing required fields: ${missing.join(', ')}`));
    }
    next();
  };
}

export function validateNumeric(field) {
  return (req, _res, next) => {
    const val = req.body?.[field];
    if (val === undefined) return next();
    const n = Number(val);
    if (!Number.isFinite(n)) {
      return next(new HttpError(400, `${field} must be a number`));
    }
    next();
  };
}

export function validateIdParam(paramName = 'id') {
  return (req, _res, next) => {
    const raw = req.params[paramName];
    const n = Number(raw);
    if (!Number.isInteger(n) || n <= 0) {
      return next(new HttpError(400, `Invalid ${paramName} format`));
    }
    next();
  };
}
