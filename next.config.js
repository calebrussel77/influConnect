/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'pbs.twimg.com',
      'picsum.photos',
      'cloudflare-ipfs.com',
      'naver.github.io',
      'avatars.githubusercontent.com',
      'uploadthing.com',
      'randomuser.me',
      'images.unsplash.com',
      'tailwindui.com',
      'utfs.io',
      'localhost',
      'loremflickr.com',
    ],
  },
  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
  transpilePackages: ['geist'],
};

export default config;
