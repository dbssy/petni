'use client';

import useSWR from 'swr';

import { DataTable } from '@/components/data-table';
import { ErrorScreen } from '@/components/error-screen';
import { LoadingScreen } from '@/components/loading-screen';
import { TabsContent } from '@/components/ui/tabs';

import { columns } from './columns';
import { ServiceTypesForm } from './service-types-form';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ServiceTypesTab() {
  const {
    data: serviceTypes,
    error,
    mutate,
  } = useSWR('/api/serviceTypes?orderBy=updatedAt', fetcher);

  if (error) {
    return (
      <ErrorScreen
        message="Erro ao carregar os tipos de serviço."
        onRetry={() => {
          window.location.reload();
        }}
      />
    );
  }

  async function handleSubmitSuccess() {
    mutate();
  }

  if (!serviceTypes) {
    return <LoadingScreen />;
  }

  return (
    <TabsContent value="types">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tipos de Serviço</h1>

          <span className="text-gray-400 text-sm">
            Gerencie os serviços fornecidos.
          </span>
        </div>

        <div className="ml-auto">
          <ServiceTypesForm onSuccessAction={handleSubmitSuccess} />
        </div>
      </div>

      <DataTable columns={columns(handleSubmitSuccess)} data={serviceTypes} />
    </TabsContent>
  );
}
