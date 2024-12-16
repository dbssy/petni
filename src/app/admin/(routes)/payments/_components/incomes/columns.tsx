'use client';

import { Customer, Payment, Service, ServiceType } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye } from 'lucide-react';
import Link from 'next/link';

import { formatCurrency, formatStatusType } from '@/lib/format';

import { ConfirmDelete } from '@/components/confirm-delete';

import { Button } from '@/components/ui/button';

type PaymentsWithServices = Payment & {
  services: (Service & {
    customer: Customer;
    serviceType: ServiceType;
  })[];
};

export const columns: ColumnDef<PaymentsWithServices>[] = [
  {
    accessorKey: 'serviceOrderId',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ordem de Serviço
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const services = row.original.services;

      const serviceOrderId =
        services.length > 0 && services[0].orderId
          ? services[0].orderId
          : 'N/A';

      return <strong>{serviceOrderId}</strong>;
    },
  },
  {
    accessorKey: 'customerName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Cliente
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const services = row.original.services;

      const customerName =
        services.length > 0 && services[0].customer
          ? services[0].customer.name
          : 'N/A';

      return <div>{customerName}</div>;
    },
  },
  {
    accessorKey: 'serviceTypeName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Serviço
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const services = row.original.services;

      const serviceTypeName =
        services.length > 0 && services[0].serviceType
          ? services[0].serviceType.name
          : 'N/A';

      return <div>{serviceTypeName}</div>;
    },
  },
  {
    accessorKey: 'value',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Valor
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value: number = row.getValue('value');

      return <div>{formatCurrency(value)}</div>;
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
        <div className="flex items-center gap-x-2">
          <Link href={`/admin/payments/${id}`}>
            <Button variant="secondary">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>

          <ConfirmDelete id={id} href="payments" label="Pagamento" />
        </div>
      );
    },
  },
];
