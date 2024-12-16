import { ServiceType } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { formatCurrency } from '@/lib/format';

import { ConfirmDelete } from '@/components/confirm-delete';
import { Button } from '@/components/ui/button';
import { ServiceTypesForm } from './service-types-form';

export const columns: (
  handleSubmitSuccess: () => void,
) => ColumnDef<ServiceType>[] = (handleSubmitSuccess) => [
  {
    accessorKey: 'name',
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
  },
  {
    accessorKey: 'price',
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
      const price: number = row.getValue('price');

      return <div>{formatCurrency(price)}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const serviceType = row.original;

      return (
        <div className="flex items-center gap-x-2">
          <ServiceTypesForm
            serviceType={serviceType}
            onSuccessAction={handleSubmitSuccess}
          />

          <ConfirmDelete
            id={serviceType.id}
            href="services"
            label="Tipo de Serviço"
          />
        </div>
      );
    },
  },
];
