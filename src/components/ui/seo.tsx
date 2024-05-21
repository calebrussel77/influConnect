import { APP_URL } from '@/constants';
import type { NextSeoProps } from 'next-seo';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import { removeTags } from '@/utils/strings';
import { truncateOnWord } from '@/utils/text';

import {
  buildCanonical,
  seoConfig,
  DEFAULT_SEO_TITLE,
  DEFAULT_SEO_IMAGE_PREVIEW,
  OG_HEIGHT,
  OG_WIDTH,
} from '@/lib/next-seo-config';

export type SeoProps = {
  title?: string;
  image?: string;
  description?: string | null;
  siteName?: string;
  url?: string;
  canonical?: string;
  nextSeoProps?: NextSeoProps;
};

/**
 * Build full seo tags from title, desc, canonical and url
 */
const buildSeoMeta = (pageProps: {
  title?: string;
  description: string;
  image?: string;
  siteName?: string;
  url?: string;
  canonical?: string;
}): NextSeoProps => {
  const {
    title,
    description,
    image,
    canonical,
    siteName = seoConfig.headSeo.siteName,
  } = pageProps;

  return {
    title: title,
    canonical: canonical,
    description,
    openGraph: {
      site_name: siteName,
      type: 'website',
      title: title,
      description: description,
      images: [
        {
          url: image ?? DEFAULT_SEO_IMAGE_PREVIEW,
          width: OG_WIDTH,
          height: OG_HEIGHT,
          alt: title,
          type: 'image/png',
        },
      ],
    },
    additionalMetaTags: [
      {
        name: 'Charset',
        content: 'UTF-8',
      },
      {
        name: 'Distribution',
        content: 'Global', // indicates that your webpage is intended for everyone
      },
      {
        name: 'Rating',
        content: 'General', // lets the younger web-surfers know the content is appropriate
      },
      {
        property: 'name',
        content: title ?? DEFAULT_SEO_TITLE,
      },
      {
        name: 'description',
        content: description,
      },
      {
        property: 'image',
        content: image ?? DEFAULT_SEO_IMAGE_PREVIEW,
      },
    ],
  };
};

const Seo = (props: SeoProps): JSX.Element => {
  const router = useRouter();
  // The below code sets the defaultUrl for our canonical tags
  // Get the router's path
  const defaultUrl = buildCanonical({
    path: router?.asPath,
    origin: APP_URL,
  });

  const {
    title,
    description,
    image,
    siteName,
    canonical = defaultUrl,
    nextSeoProps = {},
  } = props;

  const truncatedDescription = truncateOnWord(
    removeTags(description ?? ''),
    158
  );

  const seoObject = buildSeoMeta({
    title,
    image,
    description: truncatedDescription,
    canonical,
    siteName,
  });

  const seoProps: NextSeoProps = { ...nextSeoProps, ...seoObject };

  return <NextSeo {...seoProps} />;
};

export { Seo };
