import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

import { Services } from '@/components/services';
import { columns } from './_components/columns';
import { PetDetails } from './_components/pet-details';

type Params = Promise<{ petId: string }>;

export default async function PetPage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const { petId } = resolvedParams;

  const pet = await db.pet.findUnique({
    where: { id: petId },
    include: {
      customer: true,
      services: {
        include: {
          serviceType: true,
          customer: true,
        },
      },
    },
  });

  if (!pet) {
    return redirect('/admin/pets');
  }

  return (
    <div className="flex flex-col gap-y-8">
      <header className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">🐾 {pet.name}</h1>
        <span className="text-gray-500 text-sm">Perfil do Pet</span>
      </header>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-4">
          Dados básicos
        </h2>

        <PetDetails pet={pet} />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-4">
          Histórico de Serviços
        </h2>

        <Services columns={columns} services={pet.services} />
      </section>
    </div>
  );
}
