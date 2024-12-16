import { Service } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { ServicesTable } from './services-table';

interface ServicesProps {
  columns: ColumnDef<Service>[];
  services: Service[];
}

export function Services({ columns, services }: ServicesProps) {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-md p-6 space-y-2">
      <h3 className="text-gray-700 text-lg font-semibold">
        Serviços realizados
      </h3>

      <ServicesTable columns={columns} data={services} />
    </div>
  );
}
