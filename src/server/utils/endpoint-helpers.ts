import { TRPCError } from '@trpc/server';
import { getHTTPStatusCodeFromError } from '@trpc/server/http';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { type SessionUser } from 'next-auth';
import { getServerAuthSession } from '../auth';

const addCorsHeaders = (
  req: NextApiRequest,
  res: NextApiResponse,
  allowedMethods: string[] = ['GET']
) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', allowedMethods.join(', '));
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
};

export function PublicEndpoint(
  handler: (
    req: NextApiRequest,
    res: NextApiResponse
  ) => Promise<void | NextApiResponse<any>>,
  allowedMethods: string[] = ['GET']
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const shouldStop = addCorsHeaders(req, res, allowedMethods);
    if (shouldStop) return;
    await handler(req, res);
  };
}

export function AuthedEndpoint(
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
    user: SessionUser
  ) => Promise<void>,
  allowedMethods: string[] = ['GET']
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const shouldStop = addCorsHeaders(req, res, allowedMethods);
    if (shouldStop) return;

    if (!req.method || !allowedMethods.includes(req.method))
      return res.status(405).json({ error: 'Method not allowed' });

    const session = await getServerAuthSession({ req, res });
    if (!session?.user) return res.status(401).json({ error: 'Unauthorized' });
    await handler(req, res, session.user);
  };
}

export function MixedAuthEndpoint(
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
    user: SessionUser | undefined
  ) => Promise<void | NextApiResponse>,
  allowedMethods: string[] = ['GET']
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.method || !allowedMethods.includes(req.method))
      return res.status(405).json({ error: 'Method not allowed' });

    const shouldStop = addCorsHeaders(req, res, allowedMethods);
    const session = await getServerAuthSession({ req, res });
    if (shouldStop) return;

    await handler(req, res, session?.user);
  };
}

export function handleEndpointError(res: NextApiResponse, e: unknown) {
  if (e instanceof TRPCError) {
    const apiError = e;
    const status = getHTTPStatusCodeFromError(apiError);
    const parsedError = JSON.parse(apiError.message) as never;

    return res.status(status).json(parsedError);
  } else {
    const error = e as Error;
    return res.status(500).json({
      message: "Une erreur inattendue s'est produite",
      error: error.message,
    });
  }
}
