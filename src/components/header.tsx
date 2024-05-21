import { cn } from '@/lib/utils';

const Header = () => {
  return (
    <>
      <header
        className={cn(
          'default__transition sticky inset-x-0 top-0 z-50 border-b bg-white'
        )}
      >
        <nav>Hello</nav>
      </header>
    </>
  );
};

export { Header };
