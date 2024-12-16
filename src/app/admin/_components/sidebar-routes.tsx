'use client';

import {
  Briefcase,
  Dog,
  DollarSign,
  LayoutDashboard,
  LogOut,
  UserCog,
  Users,
} from 'lucide-react';

import { ServerSignout } from '@/actions/auth/signout';

import { SidebarItem } from './sidebar-item';

const routes = [
  {
    icon: LayoutDashboard,
    label: 'Visão Geral',
    href: 'overview',
  },
  {
    icon: Users,
    label: 'Clientes',
    href: 'customers',
  },
  {
    icon: Dog,
    label: 'Pets',
    href: 'pets',
  },
  {
    icon: Briefcase,
    label: 'Serviços',
    href: 'services',
  },
  {
    icon: DollarSign,
    label: 'Pagamentos',
    href: 'payments',
  },
  {
    icon: UserCog,
    label: 'Usuários',
    href: 'users',
  },
];

export function SidebarRoutes() {
  return (
    <div className="text-gray-500 text-sm font-medium flex flex-col items-center justify-center gap-4 px-2 transition">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}

      <form action={ServerSignout}>
        <button
          type="submit"
          className="hover:bg-teal-300/20 hover:text-teal-600 rounded-md text-lg text-center font-medium flex flex-col items-center justify-center gap-2 p-4 min-h-[60px] min-w-[150px]"
        >
          <LogOut size={40} />
          Sair
        </button>
      </form>
    </div>
  );
}
