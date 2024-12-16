'use client';

import useSWR from 'swr';

import { ErrorScreen } from '@/components/error-screen';
import { LoadingScreen } from '@/components/loading-screen';
import { ServicesTable } from '@/components/services-table';
import { TabsContent } from '@/components/ui/tabs';

import { columns } from './columns';
import { ServiceForm } from './service-form';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ServicesTab() {
  const { data: customers, error: customersError } = useSWR(
    '/api/customers',
    fetcher,
  );
  const { data: pets, error: petsError } = useSWR('/api/pets', fetcher);
  const { data: serviceTypes, error: serviceTypesError } = useSWR(
    '/api/serviceTypes?orderBy=name',
    fetcher,
  );
  const {
    data: services,
    error: servicesError,
    mutate,
  } = useSWR('/api/services', fetcher);

  if (customersError || petsError || serviceTypesError || servicesError) {
    return (
      <ErrorScreen
        message="Erro ao carregar os serviços."
        onRetry={() => {
          window.location.reload();
        }}
      />
    );
  }

  async function handleSubmitSuccess() {
    mutate();
  }

  if (!services) {
    return <LoadingScreen />;
  }

  return (
    <TabsContent value="services">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Serviços</h1>

          <span className="text-gray-400 text-sm">
            Gerencie as ordens de serviços realizados.
          </span>
        </div>

        <div className="ml-auto">
          <ServiceForm
            customers={customers}
            pets={pets}
            serviceTypes={serviceTypes}
            onSuccessAction={handleSubmitSuccess}
          />
        </div>
      </div>

      <ServicesTable columns={columns} data={services} />
    </TabsContent>
  );
}
