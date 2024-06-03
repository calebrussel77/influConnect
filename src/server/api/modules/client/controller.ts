import { CLIENT_VERSION } from '@/constants';
import { type Context } from '../../create-context';
import { throwDbError } from '../../../utils/error-handling';

import { REDIS_KEYS, redis } from '@/lib/redis';

export const updateClientVersionHandler = async ({ ctx }: { ctx: Context }) => {
  try {
    await redis.hset(REDIS_KEYS.CLIENT, {
      version: CLIENT_VERSION,
      date: Date.now().toString(),
    });

    return {
      message: `Client mis à jour avec succès !`,
    };
  } catch (error) {
    throw throwDbError(error);
  }
};
