'use client';

import useSWR from 'swr';

import { DataTable } from '@/components/data-table';
import { ErrorScreen } from '@/components/error-screen';
import { LoadingScreen } from '@/components/loading-screen';

import { columns } from './_components/columns';
import { CustomerForm } from './_components/customer-form';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CustomersPage() {
  const { data: customers, error, mutate } = useSWR('/api/customers', fetcher);

  if (error) {
    return (
      <ErrorScreen
        message="Erro ao carregar os clientes."
        onRetry={() => {
          window.location.reload();
        }}
      />
    );
  }

  async function handleSubmitSuccess() {
    mutate();
  }

  if (!customers) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clientes</h1>

        <CustomerForm onSuccessAction={handleSubmitSuccess} />
      </div>

      <DataTable columns={columns} data={customers} />
    </>
  );
}
