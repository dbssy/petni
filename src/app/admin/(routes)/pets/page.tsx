'use client';

import useSWR from 'swr';

import { DataTable } from '@/components/data-table';
import { ErrorScreen } from '@/components/error-screen';
import { LoadingScreen } from '@/components/loading-screen';

import { columns } from './_components/columns';
import { PetForm } from './_components/pet-form';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PetsPage() {
  const { data: customers, error: customersError } = useSWR(
    '/api/customers',
    fetcher,
  );
  const { data: pets, error: petsError, mutate } = useSWR('/api/pets', fetcher);

  if (customersError || petsError) {
    return (
      <ErrorScreen
        message="Erro ao carregar os pets."
        onRetry={() => {
          window.location.reload();
        }}
      />
    );
  }

  async function handleSubmitSuccess() {
    mutate();
  }

  if (!pets) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pets</h1>

        <PetForm customers={customers} onSuccessAction={handleSubmitSuccess} />
      </div>

      <DataTable columns={columns} data={pets} />
    </>
  );
}
