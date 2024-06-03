/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useSession } from 'next-auth/react';

import { postgresSlugify } from '@/utils/strings';

export const useCurrentUser = () => {
  const { data, status, update } = useSession();

  const isAuthed = status === 'authenticated';

  return {
    user: data?.user,
    error: data?.error,
    isAuthed,
    status,
    refresh: update,
  };
};

export const useIsSameUser = (username?: string | string[]) => {
  const { user } = useCurrentUser();

  if (!username || !user) return false;

  return (
    !!user &&
    !!user.username &&
    postgresSlugify(user.username) ===
      // @ts-ignore
      postgresSlugify(typeof username === 'string' ? username : username[0])
  );
};
