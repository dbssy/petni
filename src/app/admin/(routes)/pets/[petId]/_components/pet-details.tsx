import Link from 'next/link';

import { db } from '@/lib/db';
import { formatGender } from '@/lib/format';

import { ConfirmDelete } from '@/components/confirm-delete';

import { PetForm, PetWithCustomer } from '../../_components/pet-form';

interface PetDetailsProps {
  pet: PetWithCustomer;
}

export async function PetDetails({ pet }: PetDetailsProps) {
  const age = pet.age > 1 ? `${pet.age} anos` : `${pet.age} ano`;

  const customers = await db.customer.findMany();

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-800 text-lg font-semibold flex items-center gap-2">
          Informações do Pet
        </h3>

        <div className="flex items-center gap-4">
          <PetForm pet={pet} customers={customers} />
          <ConfirmDelete id={pet.id} href="pets" label="Pet" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm flex items-center gap-3">
          <strong className="text-gray-600">Idade:</strong>
          <span>{age}</span>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-sm flex items-center gap-3">
          <strong className="text-gray-600">Raça:</strong>
          <span>{pet.breed}</span>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-sm flex items-center gap-3">
          <strong className="text-gray-600">Sexo:</strong>
          <span>{formatGender(pet.gender)}</span>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-sm flex items-center gap-3">
          <strong className="text-gray-600">Dono:</strong>
          <Link
            href={`/admin/customers/${pet.customerId}`}
            className="text-teal-700 hover:text-teal-900 text-sm transition"
          >
            Visualizar dono
          </Link>
        </div>
      </div>
    </div>
  );
}
