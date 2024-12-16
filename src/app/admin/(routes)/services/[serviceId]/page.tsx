import Link from 'next/link';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import {
  formatCurrency,
  formatDate,
  formatDuration,
  formatGender,
  formatPaymentType,
  formatPhone,
  formatStatusType,
} from '@/lib/format';
import { cn } from '@/lib/utils';

import { ConfirmDelete } from '@/components/confirm-delete';

import { ServiceForm } from '../_components/services/service-form';

type Params = Promise<{ serviceId: string }>;

export default async function ServicePage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const { serviceId } = resolvedParams;

  const service = await db.service.findUnique({
    where: { id: serviceId },
    include: {
      customer: true,
      pet: true,
      serviceType: true,
    },
  });

  if (!service) {
    return redirect('/admin/services');
  }

  const payments = await db.payment.findMany({
    where: { services: { some: { id: serviceId } } },
  });

  const customers = await db.customer.findMany({ orderBy: { name: 'asc' } });
  const pets = await db.pet.findMany({ orderBy: { name: 'asc' } });
  const serviceTypes = await db.serviceType.findMany({
    orderBy: { name: 'asc' },
  });

  const isServiceDone = service.status === 'DONE';
  const hasEndDate = service.endAt !== null && isServiceDone;

  return (
    <div className="flex flex-col gap-8">
      <header className="bg-white p-6 shadow rounded-lg flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Serviço #{service.orderId}
          </h1>

          <p className="text-gray-500 text-sm">
            Criado em {formatDate(service.createdAt)}
          </p>

          <p className="text-gray-500 text-sm">
            {hasEndDate
              ? `Finalizado em ${formatDate(service.endAt as Date)}`
              : 'Não finalizado'}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <ServiceForm
            service={service}
            customers={customers}
            pets={pets}
            serviceTypes={serviceTypes}
          />

          <ConfirmDelete id={service.id} href="services" label="Serviço" />
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
            Informações do Serviço
          </h2>

          <div className="space-y-2">
            <p>
              <strong className="text-gray-600">Tipo:</strong>{' '}
              {service.serviceType.name}
            </p>

            <p>
              <strong className="text-gray-600">Duração:</strong>{' '}
              {formatDuration(service.duration)}
            </p>

            <p>
              <strong className="text-gray-600">Status:</strong>{' '}
              <span
                className={cn(
                  'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium',
                  `${service.status}` === 'DONE'
                    ? 'bg-green-200 text-green-800'
                    : 'bg-yellow-200 text-yellow-800',
                )}
              >
                {formatStatusType(service.status)}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white shadow border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
            Informações do Pagamento
          </h2>

          <div className="space-y-4">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="bg-gray-50 rounded-lg shadow-sm flex justify-between"
              >
                <div>
                  <p>
                    <strong className="text-gray-600">Método:</strong>{' '}
                    {formatPaymentType(payment.methodType)}
                  </p>
                  <p>
                    <strong className="text-gray-600">Valor:</strong>{' '}
                    {formatCurrency(payment.value)}
                  </p>

                  <p className="mt-1.5">
                    <span
                      className={cn(
                        'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium',
                        payment.status === 'PAID'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800',
                      )}
                    >
                      {formatStatusType(payment.status)}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
            Informações do Cliente
          </h2>

          <p>
            <strong className="text-gray-600">Nome:</strong>{' '}
            {service.customer.name}
          </p>

          <p>
            <strong className="text-gray-600">Contato:</strong>{' '}
            {formatPhone(service.customer.phone)}
          </p>
        </div>

        <div className="bg-white shadow border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
            Informações do Pet
          </h2>

          <p>
            <strong className="text-gray-600">Nome:</strong> {service.pet.name}
          </p>

          <p>
            <strong className="text-gray-600">Idade:</strong>{' '}
            {service.pet.age > 1
              ? `${service.pet.age} anos`
              : `${service.pet.age} ano`}
          </p>

          <p>
            <strong className="text-gray-600">Raça:</strong> {service.pet.breed}
          </p>

          <p>
            <strong className="text-gray-600">Sexo:</strong>{' '}
            {formatGender(service.pet.gender)}
          </p>

          <Link
            href={`/admin/pets/${service.pet.id}`}
            className="text-blue-700 hover:text-blue-900 text-sm transition"
          >
            Visualizar cadastro
          </Link>
        </div>
      </section>
    </div>
  );
}
