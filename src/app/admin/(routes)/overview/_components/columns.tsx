'use client';

import { Customer, Pet, Service, ServiceType } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye } from 'lucide-react';
import Link from 'next/link';

import { formatStatusType } from '@/lib/format';

import { Button } from '@/components/ui/button';

export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: 'serviceType',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Serviço realizado
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const serviceType: ServiceType = row.getValue('serviceType');

      return <div>{serviceType.name}</div>;
    },
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Dono
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const customer: Customer = row.getValue('customer');

      return <div>{customer.name}</div>;
    },
  },
  {
    accessorKey: 'pet',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Pet
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const pet: Pet = row.getValue('pet');

      return <div>{pet.name}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: string = row.getValue('status');

      return <div>{formatStatusType(status)}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <Link href={`/admin/services/${id}`}>
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            Visualizar
          </div>
        </Link>
      );
    },
  },
];
