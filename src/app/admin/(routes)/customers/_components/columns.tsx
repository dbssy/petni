'use client';

import { Customer, Pet } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye } from 'lucide-react';
import Link from 'next/link';

import { formatPhone } from '@/lib/format';

import { Button } from '@/components/ui/button';

export const columns: ColumnDef<Customer>[] = [
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
    accessorKey: 'phone',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Telefone
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const phone = row.getValue('phone');
      const formatted = formatPhone(String(phone));

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: 'pets',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Pets
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const pets: Pet[] = row.getValue('pets');

      const petsName = pets.map((pet) => pet.name).join(', ');

      return <div>{petsName}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <Link href={`/admin/customers/${id}`}>
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            Visualizar
          </div>
        </Link>
      );
    },
  },
];
