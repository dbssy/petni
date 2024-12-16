import { db } from '@/lib/db';

export async function getCustomersMetrics() {
  const lastMonthStart = new Date(
    new Date().setMonth(new Date().getMonth() - 1, 1),
  );

  const lastMonthEnd = new Date(new Date().setMonth(new Date().getMonth(), 0));

  const newCustomersData = await db.customer.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth(), 1)),
        lte: new Date(),
      },
    },
  });

  const newCustomers = newCustomersData;

  const lastMonthCustomersData = await db.customer.count({
    where: {
      createdAt: { gte: lastMonthStart, lte: lastMonthEnd },
    },
  });
  const lastMonthCustomers = lastMonthCustomersData;

  const customersChange = newCustomers - lastMonthCustomers;

  const customersChangePercentage =
    lastMonthCustomers > 0
      ? ((customersChange / lastMonthCustomers) * 100).toFixed(2)
      : newCustomers > 0
      ? '100'
      : '0';

  return {
    newCustomers,
    customersChange,
    customersChangePercentage,
  };
}
