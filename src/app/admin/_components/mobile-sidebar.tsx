import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Menu } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Sidebar } from './sidebar';

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="bg-white shadow-md rounded-lg p-2 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>

      <SheetContent side="left" className="bg-white p-0">
        <SheetTitle asChild>
          <VisuallyHidden.Root>Menu de Navegação</VisuallyHidden.Root>
        </SheetTitle>

        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
