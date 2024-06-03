export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.NEXT_PUBLIC_APP_URL)
    return `https://${process.env.NEXT_PUBLIC_APP_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const getInternalUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  return `http://localhost:${process.env.PORT ?? 3000}`;
};
