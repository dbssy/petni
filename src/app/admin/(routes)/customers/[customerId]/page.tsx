import { redirect } from 'next/navigation';

import { db } from '@/lib/db';

import { ConfirmDelete } from '@/components/confirm-delete';
import { Services } from '@/components/services';

import { CustomerForm } from '../_components/customer-form';

import { columns } from './_components/columns';
import { CustomerPets } from './_components/customer-pets';

type Params = Promise<{ customerId: string }>;

export default async function CustomerPage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const { customerId } = resolvedParams;

  const customer = await db.customer.findUnique({
    where: {
      id: customerId,
    },
    include: {
      pets: true,
      services: {
        include: {
          serviceType: true,
          pet: true,
        },
      },
    },
  });

  if (!customer) {
    return redirect('/admin/customers');
  }

  return (
    <div className="flex flex-col gap-y-8">
      <div className="border-b border-gray-200 pb-2 flex items-center">
        <h1 className="text-2xl font-bold">Cliente {customer.name}</h1>

        <div className="flex items-center gap-x-2 ml-auto">
          <CustomerForm customer={customer} />

          <ConfirmDelete id={customer.id} href="customers" label="Cliente" />
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <CustomerPets pets={customer.pets} />

        <Services columns={columns} services={customer.services} />
      </div>
    </div>
  );
}
