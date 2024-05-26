import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { createWaitingListSubscriptionSchema } from '../modules/waiting-list/waiting-list.schema';
import { createWaitingListSubscriptionHandler } from '../modules/waiting-list/waiting-list.controller';
import { rateLimit } from '../middleware.trpc';

export const waitingListRouter = createTRPCRouter({
  subscribe: publicProcedure
    .input(createWaitingListSubscriptionSchema)
    .use(rateLimit({ limit: 3, duration: '10 m' }))
    .mutation(createWaitingListSubscriptionHandler),
});
