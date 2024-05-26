import { redis } from '@/lib/redis';
import { getServerAuthSession } from '@/server/auth';
import { Ratelimit } from '@upstash/ratelimit';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { type Duration } from '../validations/base.validations';
import { env } from '@/env';
import requestIp from 'request-ip';

const limiterOptions = {
  points: 20, // allow points
  duration: '10 s', // per second
};

const cache = new Map();

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(
    limiterOptions.points,
    limiterOptions.duration as Duration
  ),
  ephemeralCache: cache,
});

const isRateLimited = async (
  req: NextApiRequest,
  res: NextApiResponse,
  resourceKey = 'base'
) => {
  if (!env.RATE_LIMITING) return false;

  const session = await getServerAuthSession({ req, res });
  const requesterKey =
    session?.user?.id ?? requestIp.getClientIp(req) ?? 'anonymous';

  const {
    success: isSuccess,
    limit,
    remaining,
    reset,
  } = await rateLimit.limit(`${resourceKey}::${requesterKey}`);

  res.setHeader('X-RateLimit-Limit', limit.toString());
  res.setHeader('X-RateLimit-Remaining', remaining.toString());

  if (!isSuccess) {
    const now = Date.now();
    const retryAfter = Math.floor((reset - now) / 1000);
    res.setHeader('Retry-After', retryAfter.toString());
    res.setHeader('X-RateLimit-Remaining', '0');

    res.status(429).json({
      error:
        'Vous avez dépassé le nombre maximum de tentatives. Veuillez réessayer plus tard.',
    });

    return true;
  }

  return false;
};

export const RateLimitedEndpoint =
  (
    handler: (
      req: NextApiRequest,
      res: NextApiResponse
    ) => Promise<void | NextApiResponse<any>>,
    allowedMethods: string[] = ['GET'],
    resourceKey = 'base'
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.method || !allowedMethods.includes(req.method))
      return res.status(405).json({ error: 'Method not allowed' });

    if (await isRateLimited(req, res, resourceKey)) return;

    await handler(req, res);
  };
