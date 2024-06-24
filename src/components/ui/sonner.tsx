import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react';
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
      icons={{
        error: <CircleAlert height={20} width={20} className="text-red-600" />,
        info: <Info height={20} width={20} className="text-blue-600" />,
        success: (
          <CircleCheck height={20} width={20} className="text-green-600" />
        ),
        warning: (
          <TriangleAlert height={20} width={20} className="text-yellow-600" />
        ),
      }}
      toastOptions={{
        classNames: {
          closeButton: twMerge(
            '!bg-white !left-auto !right-[var(--toast-close-button-start)]'
          ),
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
