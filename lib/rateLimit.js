// Simple in-memory rate limiting
const requestCounts = new Map();
const rateLimitWindows = new Map();

export function createRateLimiter(windowMs, maxRequests) {
  return function rateLimiter(req, res, next) {
    const key = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean up old entries
    if (rateLimitWindows.has(key)) {
      const window = rateLimitWindows.get(key);
      if (window < windowStart) {
        requestCounts.delete(key);
        rateLimitWindows.delete(key);
      }
    }

    // Check or initialize
    if (!requestCounts.has(key)) {
      requestCounts.set(key, 1);
      rateLimitWindows.set(key, now);
    } else {
      const count = requestCounts.get(key);
      if (count >= maxRequests) {
        return res.status(429).json({
          message: `Too many requests from this IP, please try again after ${Math.ceil(windowMs / 60000)} minutes`,
        });
      }
      requestCounts.set(key, count + 1);
    }

    next();
  };
}

export function createRateLimiterWithKey(windowMs, maxRequests, getKey) {
  return function rateLimiter(req, res, next) {
    const key = getKey(req);
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean up old entries
    if (rateLimitWindows.has(key)) {
      const window = rateLimitWindows.get(key);
      if (window < windowStart) {
        requestCounts.delete(key);
        rateLimitWindows.delete(key);
      }
    }

    // Check or initialize
    if (!requestCounts.has(key)) {
      requestCounts.set(key, 1);
      rateLimitWindows.set(key, now);
    } else {
      const count = requestCounts.get(key);
      if (count >= maxRequests) {
        return res.status(429).json({
          message: `Too many requests. Please try again after ${Math.ceil(windowMs / 3600000)} hour(s).`,
        });
      }
      requestCounts.set(key, count + 1);
    }

    next();
  };
}
