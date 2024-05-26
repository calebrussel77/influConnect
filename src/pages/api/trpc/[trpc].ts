import { createNextApiHandler } from '@trpc/server/adapters/next';

import { appRouter } from '@/server/api/root';
import { createContext } from '@/server/api/create-context';
import { handleTRPCError } from '@/server/api/utils/error-handling';
import { isDev } from '@/constants';

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError: ({ path, error }) => {
    if (isDev) {
      console.error(
        `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.cause?.message}`
      );
    }
    // Capture all needed errors without zod errors, and send to Logs
    handleTRPCError(error);
  },
});
