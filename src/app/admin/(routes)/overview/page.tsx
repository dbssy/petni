import { Check, Clock, DollarSign, Percent, Users } from 'lucide-react';

import { db } from '@/lib/db';

import { getAllMetrics } from '@/actions/admin/metrics';

import { Services } from '@/components/services';

import { columns } from './_components/columns';
import { FeaturedCard } from './_components/featured-card';

export default async function Overview() {
  const {
    revenueMetrics: { currentRevenue, revenueChange, revenueChangePercentage },
    expensesMetrics: {
      currentExpenses,
      expenseChange,
      expenseChangePercentage,
    },
    servicesMetrics: {
      currentServices,
      servicesChange,
      servicesChangePercentage,
    },
    hoursMetrics: { currentHours, hoursChange, hoursChangePercentage },
    customersMetrics: {
      newCustomers,
      customersChange,
      customersChangePercentage,
    },
  } = await getAllMetrics();

  const services = await db.service.findMany({
    where: {
      startAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth(), 1)),
        lte: new Date(),
      },
    },
    include: {
      serviceType: true,
      customer: true,
      pet: true,
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b border-gray-200 pb-2">
        <h1 className="text-2xl font-bold">Visão Geral</h1>

        <span className="text-gray-400 text-sm">
          Acompanhe as métricas do mês atual.
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 pb-4">
        <FeaturedCard
          iconBg="bg-green-500"
          icon={DollarSign}
          title="Faturamento"
          value={`R$ ${currentRevenue}`}
          change={`${revenueChange >= 0 ? '+' : ''}${revenueChangePercentage}`}
          changeColor={revenueChange >= 0 ? 'text-green-500' : 'text-red-600'}
        />

        <FeaturedCard
          iconBg="bg-pink-500"
          icon={Check}
          title="Serviços finalizados"
          value={currentServices}
          change={`${
            servicesChange >= 0 ? '+' : ''
          }${servicesChangePercentage}`}
          changeColor={servicesChange >= 0 ? 'text-green-500' : 'text-red-600'}
        />

        <FeaturedCard
          iconBg="bg-yellow-500"
          icon={Users}
          title="Clientes novos"
          value={newCustomers}
          change={`${
            customersChange >= 0 ? '+' : ''
          }${customersChangePercentage}`}
          changeColor={customersChange >= 0 ? 'text-green-500' : 'text-red-600'}
        />

        <FeaturedCard
          iconBg="bg-teal-500"
          icon={Clock}
          title="Horas gastas"
          value={currentHours}
          change={`${hoursChange >= 0 ? '+' : ''}${hoursChangePercentage}`}
          changeColor={hoursChange >= 0 ? 'text-green-500' : 'text-red-600'}
        />

        <FeaturedCard
          iconBg="bg-red-500"
          icon={Percent}
          title="Despesas"
          value={`R$ ${currentExpenses}`}
          change={`${expenseChange >= 0 ? '+' : ''}${expenseChangePercentage}`}
          changeColor={expenseChange >= 0 ? 'text-green-500' : 'text-red-600'}
        />
      </div>

      <Services columns={columns} services={services} />
    </div>
  );
}
