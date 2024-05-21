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
export const OG_HEIGHT = 630;
export const DEFAULT_SEO_TITLE = `InfluConnect - Connectez vos besoins aux meilleurs talents de votre région`;
export const DEFAULT_SEO_DESCRIPTION =
  'Trouvez les talents dont vous avez besoin pour répondre à vos besoins, ou proposez vos compétences pour aider les autres. Réunissez vos besoins avec les talents locaux sur notre plateforme de mise en relation. La clé pour transformer vos idées en réalité';

export const DEFAULT_SEO_IMAGE_PREVIEW = '';

/**
 * This function builds a canonical URL from a given host and path omitting the query params. Note: on homepage it omits the trailing slash
 * @param origin The protocol + host, e.g. `https://agorasafe.com` or `https://agorasafe.dev`
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
