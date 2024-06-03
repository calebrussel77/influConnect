import { APP_NAME, APP_URL } from '@/constants';
import { type DefaultSeoProps, type NextSeoProps } from 'next-seo';

export type HeadSeoProps = {
  title: string;
  description: string;
  siteName?: string;
  url?: string;
  canonical?: string;
  nextSeoProps?: NextSeoProps;
};

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 628;
export const DEFAULT_SEO_TITLE = `InfluConnect - Où les Marques et les Créateurs se rencontrent pour innover`;
export const DEFAULT_SEO_DESCRIPTION =
  'Rejoignez la première plateforme qui connecte directement les marques avec des créateurs les plus adaptés, pour des campagnes authentiques et mesurables.';

export const DEFAULT_SEO_IMAGE_PREVIEW = `${APP_URL}/influconnect-preview.png`;

/**
 * This function builds a canonical URL from a given host and path omitting the query params. Note: on homepage it omits the trailing slash
 * @param origin The protocol + host, e.g. `https://influconnect.com` or `https://influconnect.dev`
 * @param path NextJS' useRouter().asPath
 * @returns
 */
export const buildCanonical = ({
  origin,
  path,
}: {
  origin: Location['origin'];
  path: string;
}) => {
  return `${origin}${path === '/' ? '' : path}`.split('?')[0];
};

export const seoConfig: {
  headSeo: Required<Pick<HeadSeoProps, 'siteName'>>;
  defaultNextSeo: DefaultSeoProps;
} = {
  headSeo: {
    siteName: APP_NAME,
  },
  defaultNextSeo: {
    defaultTitle: DEFAULT_SEO_TITLE,
    titleTemplate: '%s | Influconnect',
    description: DEFAULT_SEO_DESCRIPTION,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: `${APP_URL}/`,
      images: [
        {
          url: DEFAULT_SEO_IMAGE_PREVIEW,
          width: OG_WIDTH,
          height: OG_HEIGHT,
          alt: APP_NAME,
          type: 'image/png',
        },
      ],
      site_name: APP_NAME,
    },
    languageAlternates: [
      { href: `${APP_URL}`, hrefLang: 'en' },
      { href: `${APP_URL}/fr`, hrefLang: 'fr' },
    ],
    twitter: {
      handle: '@influconnect',
      site: '@influconnect',
      cardType: 'summary_large_image',
    },
  },
} as const;
