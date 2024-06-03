import { DefaultSeo as DefaultNextSeo } from 'next-seo';
import { seoConfig } from '@/lib/next-seo-config';

const DefaultSeo = ({ canonical }: { canonical?: string }) => {
  return <DefaultNextSeo {...seoConfig.defaultNextSeo} canonical={canonical} />;
};

export { DefaultSeo };
