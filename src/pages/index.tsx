import Link from 'next/link';

import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import LocaleSwitcher from '@/components/local-switcher';
import { type GetServerSidePropsContext } from 'next';
import { Typography } from '@/components/ui/typography';
import { useCurrentUser } from '@/hooks/use-current-user';
import { createServerSideProps } from '@/server/utils/server-side';

export default function Home() {
  const { user: currentUser } = useCurrentUser();

  console.log({ currentUser });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <LocaleSwitcher />
      </div>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Typography as="h3">
          {currentUser ? (
            `Welcome back, ${currentUser.name}!`
          ) : (
            <span>
              Welcome to InfluConnect, please{' '}
              <Link href="/login" className="text-primary hover:underline">
                sign in
              </Link>{' '}
              to continue.
            </span>
          )}
        </Typography>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-card p-4 hover:bg-card/80"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-card p-4 hover:bg-card/80"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Documentation →</h3>
            <div className="text-lg">
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AuthShowcase />
        </div>
      </div>
    </div>
  );
}

function AuthShowcase() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          onClick={() =>
            toast.loading('Chargement...', {
              description: 'Sunday, December 03, 2023 at 9:00 AM',
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
              },
              cancel: {
                label: 'Redo',
                onClick: () => console.log('Redo'),
              },
            })
          }
        >
          Display toast message
        </Button>
        <Button href="/login">Login to the app</Button>
      </div>
    </div>
  );
}

export const getServerSideProps = createServerSideProps({
  resolver: async ({ session, ctx }) => {
    return {
      props: {},
    };
  },
});
