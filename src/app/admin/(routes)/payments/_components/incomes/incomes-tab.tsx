'use client';

import useSWR from 'swr';

import { ErrorScreen } from '@/components/error-screen';
import { LoadingScreen } from '@/components/loading-screen';
import { TabsContent } from '@/components/ui/tabs';

import { columns } from './columns';
import { IncomeForm } from './income-form';
import { IncomeTable } from './income-table';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function IncomesTab() {
  const { data: services, error: servicesError } = useSWR(
    '/api/services',
    fetcher,
  );
  const {
    data: payments,
    error: paymentsError,
    mutate,
  } = useSWR('/api/payments?type=INCOME', fetcher);

  if (servicesError || paymentsError) {
    return (
      <ErrorScreen
        message="Erro ao carregar as receitas."
        onRetry={() => {
          window.location.reload();
        }}
      />
    );
  }

  async function handleSubmitSuccess() {
    mutate();
  }

  if (!payments) {
    return <LoadingScreen />;
  }

  return (
    <TabsContent value="incomes">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Minhas receitas</h1>

          <span className="text-gray-400 text-sm">
            Gerencie os pagamentos a serem recebidos.
          </span>
        </div>

        <div className="ml-auto">
          <IncomeForm
            services={services}
            onSuccessAction={handleSubmitSuccess}
          />
        </div>
      </div>

      <IncomeTable columns={columns} data={payments} />
    </TabsContent>
  );
}
