import React, { type FC, type ReactNode } from 'react';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Seo, type SeoProps } from '@/components/ui/seo';

import { cn } from '@/lib/utils';

interface MainProps extends Omit<SeoProps, 'children' | 'description'> {
  className?: string;
  description?: string | null;
  children?: ReactNode;
  header?: ReactNode | JSX.Element;
  footer?: ReactNode | JSX.Element;
}

const MainLayout: FC<MainProps> = ({
  title,
  description,
  children,
  className,
  header = <Header />,
  footer = <Footer />,
  ...rest
}) => {
  return (
    <>
      <Seo title={title} description={description} {...rest} />
      {header}
      <main className="relative mb-auto flex h-full flex-1 flex-col">
        {children}
      </main>
      {footer}
    </>
  );
};

const getLayout = (page: React.ReactElement<SeoProps>) => {
  return <MainLayout {...page.props}>{page}</MainLayout>;
};

export { MainLayout, getLayout as getMainLayout };
