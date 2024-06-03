import { GithubIcon, MailIcon, type LucideProps } from 'lucide-react';
import { Button, type ButtonProps } from '../ui/button';
import { type BuiltInProviderType } from 'next-auth/providers/index';
import { GoogleSolidIcon } from '../icons/google-solid-icon';

type SocialProps = Partial<
  Record<
    BuiltInProviderType,
    {
      label?: React.ReactNode;
      Icon?: React.ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
      >;
      Button?: React.FunctionComponent<ButtonProps>;
    }
  >
>;

export const socialItems: SocialProps = {
  github: {
    label: 'Continuer avec GitHub',
    Icon: GithubIcon,
    Button: GitHubButton,
  },
  google: {
    label: 'Continuer avec Google',
    Icon: GoogleSolidIcon as never,
    Button: GoogleButton,
  },
  email: {
    label: 'Continuer avec un Email',
    Icon: MailIcon,
    Button: EmailButton,
  },
};

const googleColor = '#4285F4';
const emailColor = '#666';

export function DiscordButton(props: ButtonProps) {
  return <Button {...props} />;
}

export function GitHubButton(props: ButtonProps) {
  return <Button {...props} />;
}

export function GoogleButton(props: ButtonProps) {
  return <Button {...props} />;
}

export function RedditButton(props: ButtonProps) {
  return <Button {...props} />;
}

export function EmailButton(props: ButtonProps) {
  return <Button {...props} />;
}
