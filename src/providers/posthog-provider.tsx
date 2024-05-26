import React, { type PropsWithChildren } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

interface PosthogProviderProps {
  className?: string;
}

const PosthogProvider = ({
  children,
}: PropsWithChildren<PosthogProviderProps>) => {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

export { PosthogProvider };
