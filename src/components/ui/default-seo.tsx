import { DefaultSeo as DefaultNextSeo } from 'next-seo';
import { seoConfig } from '@/lib/next-seo-config';

const DefaultSeo = () => {
  return <DefaultNextSeo {...seoConfig.defaultNextSeo} />;
};

export { DefaultSeo };
