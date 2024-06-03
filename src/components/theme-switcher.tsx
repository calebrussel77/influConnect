import { DropdownMenu } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

type ThemeSwitcherProps = {
  className?: string;
};

const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { setTheme, theme } = useTheme();

  const onHandleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onHandleClick}
      className={className}
    >
      <Sun className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 md:h-[1.2rem] md:w-[1.2rem]" />
      <Moon className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 md:h-[1.2rem] md:w-[1.2rem]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export { ThemeSwitcher };
