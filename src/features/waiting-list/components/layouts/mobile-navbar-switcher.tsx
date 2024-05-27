import { Logo } from '@/components/icons/logo';
import { ActiveLink } from '@/components/ui/active-link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useDisclosure } from '@/hooks/use-disclosure';
import { openContext } from '@/providers/modals-manager-provider';
import { Menu } from 'lucide-react';
import { Fragment } from 'react';

export function MobileNavbarSwitcher({
  links,
}: {
  links: [{ name: string; href: string }];
}) {
  const { onClose, isOpen, onOpen, toggle } = useDisclosure();

  return (
    <Sheet onOpenChange={toggle} open={isOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="flex flex-shrink-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="space-y-16">
          <Logo />
          <div className="flex flex-col items-start justify-start">
            {links.map((item, idx) => (
              <Fragment key={item.name}>
                {idx > 0 ? <Separator className="my-4" /> : null}
                <ActiveLink
                  onClick={onClose}
                  href={item.href}
                  activeClassName="text-primary"
                >
                  {item.name}
                </ActiveLink>
              </Fragment>
            ))}
          </div>
          <Button
            isFullWidth
            onClick={() => openContext('subscribeWaitingList', {})}
          >
            Rejoindre la liste d’attente
          </Button>
          {/* <SheetFooter>
            <SheetClose asChild>
              
            </SheetClose>
          </SheetFooter> */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
