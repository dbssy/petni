'use client';

import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export function SidebarItem({ icon: Icon, label, href }: SidebarItemProps) {
  const pathname = usePathname();
  const router = useRouter();

  const absoluteHref = href.startsWith('/admin') ? href : `/admin/${href}`;

  const isActive =
    pathname === absoluteHref || pathname?.startsWith(`${absoluteHref}/`);

  function onClick() {
    router.push(absoluteHref);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'hover:bg-teal-300/20 hover:text-teal-600 rounded-md text-lg text-center font-medium flex flex-col items-center justify-center gap-y-2 p-4 min-h-[60px] min-w-[150px]',
        isActive &&
          'bg-teal-300/20 text-teal-600 hover:bg-teal-300/20 hover:text-teal-600',
      )}
    >
      <Icon size={40} className={cn(isActive && 'text-teal-600')} />

      {label}
    </button>
  );
}
