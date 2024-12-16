'use client';

import useSWR from 'swr';

import { DataTable } from '@/components/data-table';
import { ErrorScreen } from '@/components/error-screen';
import { LoadingScreen } from '@/components/loading-screen';

import { columns } from './_components/columns';
import { CreateUser } from './_components/create-user';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UsersPage() {
  const { data: users, error, mutate } = useSWR('/api/users', fetcher);

  if (error) {
    return (
      <ErrorScreen
        message="Erro ao carregar os usuários."
        onRetry={() => {
          window.location.reload();
        }}
      />
    );
  }

  async function handleSubmitSuccess() {
    mutate();
  }

  if (!users) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Usuários</h1>

        <CreateUser onSuccessAction={handleSubmitSuccess} />
      </div>

      <DataTable columns={columns} data={users} />
    </>
  );
}
