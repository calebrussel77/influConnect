import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';
import { twMerge } from 'tailwind-merge';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          icon: twMerge('!text-primary'),
          toast: twMerge('!bg-background !border-border !shadow-lg'),
          content: twMerge('!font-sans !text-foreground'),
          description: twMerge('!text-muted-foreground'),
          actionButton: twMerge(
            '!bg-primary !font-sans !text-primary-foreground hover:!bg-primary/80'
          ),
          cancelButton: twMerge(
            '!bg-muted !font-sans !text-muted-foreground hover:!bg-muted/80'
          ),
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
