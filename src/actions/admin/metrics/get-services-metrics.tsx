import { db } from '@/lib/db';

export async function getServicesMetrics() {
  const lastMonthStart = new Date(
    new Date().setMonth(new Date().getMonth() - 1, 1),
  );

  const lastMonthEnd = new Date(new Date().setMonth(new Date().getMonth(), 0));

  const currentServicesData = await db.service.count({
    where: {
      status: 'DONE',
      endAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth(), 1)),
        lte: new Date(),
      },
    },
  });
  const currentServices = currentServicesData;

  const lastMonthServicesData = await db.service.count({
    where: {
      status: 'DONE',
      endAt: { gte: lastMonthStart, lte: lastMonthEnd },
    },
  });
  const lastMonthServices = lastMonthServicesData;

  const servicesChange = currentServices - lastMonthServices;

  const servicesChangePercentage =
    lastMonthServices > 0
      ? ((servicesChange / lastMonthServices) * 100).toFixed(2)
      : currentServices > 0
      ? '100'
      : '0';

  return {
    currentServices,
    servicesChange,
    servicesChangePercentage,
  };
}
