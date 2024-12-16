'use client';

import useSWR from 'swr';

import { DataTable } from '@/components/data-table';
import { ErrorScreen } from '@/components/error-screen';
import { LoadingScreen } from '@/components/loading-screen';
import { TabsContent } from '@/components/ui/tabs';

import { columns } from './columns';
import { ExpenseForm } from './expense-form';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ExpensesTab() {
  const {
    data: expenses,
    error,
    mutate,
  } = useSWR('/api/payments?type=EXPENSE', fetcher);

  if (error) {
    return (
      <ErrorScreen
        message="Erro ao carregar as despesas."
        onRetry={() => {
          window.location.reload();
        }}
      />
    );
  }

  async function handleSubmitSuccess() {
    mutate();
  }

  if (!expenses) {
    return <LoadingScreen />;
  }

  return (
    <TabsContent value="expenses">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Minhas despesas</h1>

          <span className="text-gray-400 text-sm">
            Gerencie os pagamentos a serem pagos.
          </span>
        </div>

        <div className="ml-auto">
          <ExpenseForm onSuccessAction={handleSubmitSuccess} />
        </div>
      </div>

      <DataTable columns={columns} data={expenses} />
    </TabsContent>
  );
}
