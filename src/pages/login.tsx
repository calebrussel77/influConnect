import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { SectionMessage } from '@/components/ui/section-message';
import { SignInError } from '@/components/sign-error';

import {
  type LoginRedirectReason,
  loginRedirectReasons,
} from '@/features/authentication';

import { handleRouteBack } from '@/utils/routing';

import { cn } from '@/lib/utils';

import { createServerSideProps } from '@/server/utils/server-side';
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Seo } from '@/components/ui/seo';
import { getCsrfToken, getProviders, signIn } from 'next-auth/react';
import { getBaseUrl } from '@/utils/url-helpers';
import { SocialButton } from '@/components/social';
import { type BuiltInProviderType } from 'next-auth/providers/index';
import { Typography } from '@/components/ui/typography';

type PageProps = InferNextProps<typeof getServerSideProps>;

const LoginPage = ({ providers }: PageProps) => {
  const [providerSelected, setProviderSelected] = useState<
    BuiltInProviderType | undefined
  >(undefined);
  const router = useRouter();
  const {
    error,
    returnUrl = '/',
    reason,
  } = router.query as {
    error: string;
    returnUrl: string;
    reason: LoginRedirectReason;
  };

  const redirectReason = loginRedirectReasons[reason];

  return (
    <>
      <Seo title="Se connecter sur InfluConnect" />
      <div className="fixed bottom-0 left-0 top-0 hidden h-full w-1/2 flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <Image
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
          width={1000}
          height={1000}
          fill={false}
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <div className="flex h-screen w-full flex-col lg:ml-auto lg:w-1/2">
        {!!error && <SignInError className="mb-0 rounded-none" error={error} />}
        {!!redirectReason && (
          <SectionMessage
            className="mb-0 rounded-none"
            title={redirectReason}
            appareance="warning"
            isSticky
          />
        )}
        <div className="flex h-full flex-1 flex-col p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleRouteBack({ router })}
              className={cn(buttonVariants({ variant: 'ghost' }))}
            >
              <span>Retour</span>
            </button>
            <Link href="/" className="ml-1 flex items-center gap-x-1.5">
              <Logo className="h-5 w-auto" />
            </Link>
          </div>
          <div className="mx-auto flex h-full w-full flex-1 flex-col items-center justify-center space-y-6 sm:w-[450px]">
            <div className="flex flex-col space-y-2 text-center">
              <Typography as="h2">Commencez en quelques secondes</Typography>
              <Typography variant="small">
                Utilisez votre e-mail ou un autre service pour continuer avec
                Influconnect (c’est gratuit) !
              </Typography>
            </div>
            {providers
              ? Object.values(providers)
                  .filter(x => x.id !== 'email')
                  .map(provider => {
                    return (
                      <SocialButton
                        key={provider.name}
                        provider={provider.id as BuiltInProviderType}
                        isLoading={provider.id === providerSelected}
                        isFullWidth
                        onClick={async () => {
                          setProviderSelected(provider.id as never);
                          await signIn(provider.id, { callbackUrl: returnUrl });
                          setProviderSelected(undefined);
                        }}
                      />
                    );
                  })
              : null}
            <p className="px-8 text-center text-sm text-muted-foreground">
              En continuant, vous acceptez nos{' '}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                conditions générales d’utilisation
              </Link>{' '}
              et{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = createServerSideProps({
  shouldUseSession: true,
  resolver: async ({ session, ctx }) => {
    if (session) {
      const { callbackUrl, error, reason } = ctx.query;
      if (reason !== 'switch-accounts') {
        const destinationURL = new URL(
          typeof callbackUrl === 'string' ? callbackUrl : '/',
          getBaseUrl()
        );
        if (error) destinationURL.searchParams.set('error', error as string);
        const destination = `${destinationURL.pathname}${destinationURL.search}${destinationURL.hash}`;

        return {
          redirect: {
            destination,
            permanent: false,
          },
        };
      }
    }

    const providers = await getProviders();
    const csrfToken = await getCsrfToken();

    return {
      props: { providers, csrfToken },
    };
  },
});

LoginPage.getLayout = (page: React.ReactElement) => page;

export default LoginPage;
