import { middleware } from './trpc';
import { Ratelimit } from '@upstash/ratelimit';
import { throwRateLimitError } from './utils/error-handling';
import { redis } from '@/lib/redis';
import { type Duration } from './validations/base.validations';

type RateLimit = {
  limit?: number;
  duration?: Duration; // seconds
};

const cache = new Map();

// Default : Create a new ratelimiter, that allows 10 requests per 10 seconds
export function rateLimit({ limit, duration }: RateLimit = {}) {
  limit ??= 10;
  duration ??= '10 s';

  const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, duration),
    ephemeralCache: cache,
  });

  return middleware(async ({ ctx, next }) => {
    const identifier = ctx.user?.id?.toString() ?? ctx.ip ?? 'anonymous';

    const {
      success: isSuccess,
      limit,
      remaining,
      reset,
    } = await rateLimit.limit(identifier);

    ctx.res.setHeader('X-RateLimit-Limit', limit);
    ctx.res.setHeader('X-RateLimit-Remaining', remaining);

    if (!isSuccess) {
      const now = Date.now();
      const retryAfter = Math.floor((reset - now) / 1000);

      ctx.res.setHeader('Retry-After', String(retryAfter));

      throwRateLimitError('Too Many requests', { retryAfter });
    }
    return await next();
  });
}
