import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { api } from '@/utils/api';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import LocaleSwitcher from '@/components/local-switcher';
import { type GetServerSidePropsContext } from 'next';

export default function Home() {
  const hello = api.post.hello.useQuery({ text: 'from tRPC' });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <LocaleSwitcher />
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
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
          <div className="flex items-center gap-6">
            <ThemeSwitcher />
            <p className="text-2xl ">
              {hello.data ? hello.data.greeting : 'Loading tRPC query...'}
            </p>
          </div>
          <AuthShowcase />
        </div>
      </div>
    </div>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  const sendEmailMutation = api.email.send.useMutation();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
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
        <Button
          disabled={sendEmailMutation.isPending}
          onClick={() =>
            toast.promise(sendEmailMutation.mutateAsync(), {
              dismissible: true,
              loading: 'Sending email...',
              success(data) {
                return data.message;
              },
              error(error: Error) {
                return error?.message;
              },
            })
          }
        >
          Send mail to Caleb Russel
        </Button>
      </div>
    </div>
  );
}

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: {
      messages:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (await import(`../../messages/${locale}.json`)).default as never,
    },
  };
}
