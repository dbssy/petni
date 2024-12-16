'use client';

import { User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye } from 'lucide-react';
import Link from 'next/link';

import { ConfirmDelete } from '@/components/confirm-delete';
import { Button } from '@/components/ui/button';

import { ChangeUserPassword } from './change-user-password';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/users/${id}`}
            className="bg-gray-100 rounded-md px-4 py-2"
          >
            <Eye className="w-5 h-5" />
          </Link>

          <ChangeUserPassword userId={id} />

          <ConfirmDelete id={id} href="users" label="Usuário" />
        </div>
      );
    },
  },
];
