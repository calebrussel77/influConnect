import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { updateClientVersionHandler } from '../modules/client/client.controller';

export const clientRouter = createTRPCRouter({
  updateVersion: publicProcedure.mutation(updateClientVersionHandler),
});
