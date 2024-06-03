import { type BuiltInProviderType } from 'next-auth/providers/index';
import { socialItems } from './social';
import { type ButtonProps } from '../ui/button';

type Props = {
  provider: BuiltInProviderType;
} & React.ComponentPropsWithoutRef<'button'> &
  ButtonProps;

export function SocialButton({ provider, ...buttonProps }: Props) {
  const { Icon, label, Button } = socialItems[provider] ?? {};

  if (!Button) return null;

  return (
    <Button {...buttonProps}>
      {Icon && <Icon className="h-6 w-6" />}
      {label}
    </Button>
  );
}
